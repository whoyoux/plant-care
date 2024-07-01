export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export const siteConfig = {
	name: "PlantCare - Identify and Care for Your Plants",
	shortName: "PlantCare",
	description:
		"PlantCare helps you identify plants and provides detailed care instructions. Simply take a photo of a plant and get all the information you need.",
	url: new URL(BASE_URL),
	ogImage: `${BASE_URL}/og.jpg`,
	links: {
		github: "https://github.com/whoyoux/plant-care",
	},
	keywords: [
		"plant care",
		"plant identification",
		"gardening",
		"plant health",
		"plant tips",
		"plant care guide",
		"plant care app",
		"plant care website",
	],
	authors: [
		{
			name: "whoyoux",
			url: "https://whx.world",
		},
	],
	creator: "whx",
};
