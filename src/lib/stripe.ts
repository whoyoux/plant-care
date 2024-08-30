import "server-only";

import { PLANS } from "@prisma/client";

import Stripe from "stripe";

const key = process.env.STRIPE_SECRET;
if (!key) {
	throw new Error("Missing Stripe secret key");
}

export function getCreditsFromPlan(plan: PLANS) {
	switch (plan) {
		case PLANS.BASIC:
			return +(process.env.SEEDLING_PLAN_CREDITS || 50);
		case PLANS.MEDIUM:
			return +(process.env.BLOOMING_PLAN_CREDITS || 200);
		case PLANS.PRO:
			return +(process.env.FOREST_PLAN_CREDITS || 500);
		default:
			return 0;
	}
}

export const getPriceIDFromPlan = (plan: PLANS) => {
	switch (plan) {
		case PLANS.BASIC:
			return process.env.STRIPE_SEEDLING_PLAN_PRICE_ID;
		case PLANS.MEDIUM:
			return process.env.STRIPE_BLOOMING_PLAN_PRICE_ID;
		case PLANS.PRO:
			return process.env.STRIPE_FOREST_PLAN_PRICE_ID;
		default:
			return process.env.STRIPE_SEEDLING_PLAN_PRICE_ID;
	}
};

export const stripe = new Stripe(key, {
	apiVersion: "2024-06-20",
	typescript: true,
});
