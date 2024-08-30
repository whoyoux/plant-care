import type Stripe from "stripe";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import type { PLANS } from "@prisma/client";
import { getCreditsFromPlan } from "@/lib/utils";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(request: NextRequest) {
	const body = await request.text();
	const sig = headers().get("stripe-signature") as string;

	let event: Stripe.Event;
	try {
		event = await stripe.webhooks.constructEventAsync(
			body,
			sig,
			WEBHOOK_SECRET,
		);
	} catch (err) {
		return new Response(`Webhook error: ${err}`, {
			status: 400,
		});
	}

	console.log(event);

	switch (event.type) {
		case "checkout.session.expired": {
			const session = event.data.object as Stripe.Checkout.Session;
			if (!session)
				return new Response("There is something wrong with session object. ", {
					status: 400,
				});

			const orderId = session.metadata?.orderId;
			if (!orderId)
				return new Response("There is something wrong with orderId. ", {
					status: 400,
				});

			try {
				await prisma.order.update({
					where: {
						id: orderId,
					},
					data: {
						expired: true,
						expiresAt: new Date(),
					},
				});
			} catch (err) {
				return new Response(`Database error: ${err}`, {
					status: 500,
				});
			}

			break;
		}
		case "checkout.session.completed": {
			try {
				const session = event.data.object as Stripe.Checkout.Session;
				if (!session)
					return new Response(
						"There is something wrong with session object. ",
						{
							status: 400,
						},
					);

				const orderId = session.metadata?.orderId;
				const plan = session.metadata?.plan as PLANS | undefined;

				if (!orderId || !plan)
					return new Response("There is something wrong with orderId. ", {
						status: 400,
					});

				const order = await prisma.order.findUnique({
					where: {
						id: orderId,
					},
				});

				if (!order?.userId) {
					return new Response("Order not found", {
						status: 404,
					});
				}

				if (order.plan !== plan) {
					await prisma.order.update({
						where: {
							id: orderId,
						},
						data: {
							cancelled: true,
							cancelledAt: new Date(),
							cancelledBy: "Order plan does not match",
						},
					});

					return new Response("Order plan does not match", {
						status: 400,
					});
				}

				await prisma.user.update({
					where: {
						id: order.userId,
					},
					data: {
						balance: {
							increment: getCreditsFromPlan(plan),
						},
					},
				});

				await prisma.order.update({
					where: {
						id: orderId,
					},
					data: {
						paid: true,
						paidAt: new Date(),
					},
				});

				return new Response("Webhook received", { status: 200 });
			} catch (err) {
				console.error("WEBHOOK ERROR!", err);
				return new Response("Webhook received but failed to process order", {
					status: 500,
				});
			}
		}
		default: {
			console.log(`Unhandled event type ${event.type}`);
		}
	}
	return new Response("what", { status: 200 });
}
