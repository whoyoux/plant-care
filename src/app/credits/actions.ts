"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPriceIDFromPlan, stripe } from "@/lib/stripe";
import { getBaseUrl } from "@/lib/utils";
import { PLANS } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

const plansSchema = z.nativeEnum(PLANS);

type CheckoutResponse =
	| never
	| {
			success: false;
			message: string;
	  };

export async function goToCheckout(
	formData: FormData,
): Promise<CheckoutResponse> {
	console.log("formData", formData.get("plan"));
	const plan = plansSchema.safeParse(formData.get("plan"));

	if (!plan.success) {
		console.log("Validation error");
		return {
			success: false,
			message: "Invalid plan",
		};
	}

	const session = await auth();

	if (!session?.user?.id || !session?.user?.email) {
		return {
			success: false,
			message: "You must be logged in to checkout",
		};
	}

	const newOrder = await prisma.order.create({
		data: {
			plan: plan.data,
			user: {
				connect: {
					id: session.user.id,
				},
			},
		},
	});

	const stripeSession = await stripe.checkout.sessions.create({
		success_url: `${getBaseUrl()}/dashboard`,
		cancel_url: `${getBaseUrl()}/`,
		payment_method_types: ["card"],
		mode: "payment",
		customer_email: session.user.email,
		line_items: [
			{
				price: getPriceIDFromPlan(plan.data),
				quantity: 1,
			},
		],
		metadata: {
			orderId: newOrder.id,
			plan: plan.data,
		},
	});

	if (!stripeSession?.url) {
		await prisma.order.update({
			where: {
				id: newOrder.id,
			},
			data: {
				cancelled: true,
				cancelledAt: new Date(),
				cancelledBy: "Stripe API",
			},
		});

		return {
			success: false,
			message: "Failed to create session",
		};
	}

	redirect(stripeSession.url);
}
