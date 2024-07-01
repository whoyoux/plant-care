"use server";

import { authAction } from "@/lib/safe-action";
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
		return {
			success: true,
		};
	});
