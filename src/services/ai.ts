"server-only";

import { openai } from "@ai-sdk/openai";
import { generateObject, generateText } from "ai";
import { z } from "zod";

export const findPlant = async () => {
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
						image: new URL(
							"https://malaszklarnia.pl/wp-content/uploads/2023/05/aloes-drzewiasty-aloe-arborescens.jpg",
							// "https://utfs.io/f/c25c4aca-3e86-423f-a00f-39d7d91d37d9-rhhqyj.png",
						),
					},
				],
			},
		],
	});

	console.log("USAGE: ", usage);

	return object;
};
