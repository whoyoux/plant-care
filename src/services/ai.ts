"server-only";

import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export const findPlant = async (imageUrl: string) => {
	console.log("start finding plant");
	const { object, usage } = await generateObject({
		model: openai("gpt-4o"),
		schema: z.object({
			isFound: z.boolean(),
			name: z.string(),
			scientificName: z.string(),
			description: z.string(),
			carePlan: z.array(z.string()),
			errorMessage: z.string().optional(),
			plan: z.object({
				watering: z.string(),
				light: z.string(),
				soil: z.string(),
				temperature: z.string(),
				humidity: z.string(),
				fertilization: z.string(),
				repotting: z.string(),
				other: z.string(),
			}),
		}),
		messages: [
			{
				role: "system",
				content:
					"You are an expert botanist and plant care specialist. Your task is to identify plants from images and provide detailed care instructions. If you can't identify the plant or if no plant is present, set isFound to false and provide an explanation in errorMessage.",
			},
			{
				role: "user",
				content: [
					{
						type: "text",
						text: "Please analyze this image and provide the following information about the plant:\n1. Common name\n2. Scientific name\n3. Brief description (including appearance and notable features)\n4. Detailed care plan (including watering, light, soil, temperature, and any special requirements)\n\nIf you cannot identify the plant or if the image doesn't contain a plant, please indicate that in your response.",
					},
					{
						type: "image",
						image: new URL(imageUrl),
					},
				],
			},
		],
	});

	return object;
};
