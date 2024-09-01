"use server";

import { prisma } from "@/lib/prisma";
import { authAction } from "@/lib/safe-action";
import { findPlant } from "@/services/ai";
import { uploadImage } from "@/services/storage";
import { revalidatePath } from "next/cache";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
	photo: zfd.file(),
});

export const uploadPhotoAndIdentifyPlantAction = authAction
	.metadata({ actionName: "uploadPhotoAndIdentifyPlantAction" })
	.schema(schema)
	.action(async ({ parsedInput: { photo }, ctx: { session } }) => {
		const tx = await prisma.$transaction(
			async (tx) => {
				const user = await tx.user.findUnique({
					where: {
						id: session.user.id,
					},
					select: {
						balance: true,
					},
				});

				if (!user) {
					return {
						success: false,
						message: "User not found!",
					};
				}

				if (user.balance < 1) {
					return {
						success: false,
						message: "Insufficient balance!",
					};
				}

				const uploadResult = await uploadImage(photo, session.user.id);
				if (!uploadResult.success) {
					return {
						success: false,
						message: uploadResult.error,
					};
				}
				const imageFile = await tx.imageFile.create({
					data: {
						url: uploadResult.url,
						key: uploadResult.key,
						user: {
							connect: {
								id: session.user.id,
							},
						},
					},
				});

				const aiResult = await findPlant(uploadResult.url);

				const imgResult = await tx.imageResult.create({
					data: {
						isFound: aiResult.isFound,
						name: aiResult.name,
						description: aiResult.description,
						scientificName: aiResult.scientificName,
						carePlan: aiResult.carePlan,
						errorMessage: aiResult.errorMessage,
						watering: aiResult.plan.watering,
						light: aiResult.plan.light,
						soil: aiResult.plan.soil,
						temperature: aiResult.plan.temperature,
						humidity: aiResult.plan.humidity,
						fertilization: aiResult.plan.fertilization,
						repotting: aiResult.plan.repotting,
						other: aiResult.plan.other,
						user: {
							connect: {
								id: session.user.id,
							},
						},
						imageFile: {
							connect: {
								id: imageFile.id,
							},
						},
					},
				});

				await tx.user.update({
					where: {
						id: session.user.id,
					},
					data: {
						balance: {
							decrement: 1,
						},
					},
				});

				return {
					success: true,
					plantId: imgResult.id,
					message: "Successfully uploaded and identified the plant!",
				};
			},
			{ timeout: 32000 },
		);

		revalidatePath("/plants");

		return tx;
	});
