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
			description: z.string(),
			carePlan: z.array(z.string()),
			errorMessage: z.string().optional(),
		}),
		messages: [
			{
				role: "user",
				content: [
					{
						type: "text",
						text: "Please tell me what plant is it and how should I take care of it?",
					},
					{
						type: "image",
						image: new URL(imageUrl),
					},
				],
			},
		],
	});

	console.log("USAGE: ", usage);

	return object;
};
