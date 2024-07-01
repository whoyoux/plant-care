import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const GetVideoURL = (key?: string) => {
	return `https://pub-1adb3e21b06b45418985eb6b65932a33.r2.dev/${key}`;
};
