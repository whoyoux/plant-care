"use server";

import { authAction } from "@/lib/safe-action";
import { findPlant } from "@/services/ai";
import { UploadImage } from "@/services/storage";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
	photo: zfd.file(),
});

export const uploadPhotoAndIdentifyPlantAction = authAction
	.metadata({ actionName: "uploadPhotoAndIdentifyPlantAction" })
	.schema(schema)
	.action(async ({ parsedInput: { photo }, ctx: { session } }) => {
		console.log(photo);
		console.log(session.user.email);
		const uploadResult = await UploadImage(photo, session.user.id);
		if (!uploadResult.success) {
			return {
				success: false,
				error: uploadResult.error,
			};
		}
		const aiResult = await findPlant(uploadResult.url);
		console.log(aiResult);
		return {
			success: true,
		};
	});
