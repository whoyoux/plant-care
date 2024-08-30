import { PLANS } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const GetVideoURL = (key?: string) => {
	return `https://pub-1adb3e21b06b45418985eb6b65932a33.r2.dev/${key}`;
};

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
			return process.env.SEEDLING_PLAN_PRICE_ID;
		case PLANS.MEDIUM:
			return process.env.BLOOMING_PLAN_PRICE_ID;
		case PLANS.PRO:
			return process.env.FOREST_PLAN_PRICE_ID;
		default:
			return process.env.SEEDLING_PLAN_PRICE_ID;
	}
};

export function getBaseUrl() {
	return process.env.NODE_ENV === "production"
		? "https://plant-care-whx.vercel.app"
		: "http://localhost:3000";
}
