"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import { uploadPhotoAndIdentifyPlantAction } from "./actions";

const UploadPhoto = () => {
	const [isPending, setIsPending] = useState(false);
	const [photo, setPhoto] = React.useState<File | null>(null);

	const processPhoto = async () => {
		if (!photo) {
			toast.error("No photo selected. Please select a photo.");
			return;
		}

		if (photo.size > 1024 * 1024 * 5) {
			toast.error(
				"The file size is too large. Please select a file smaller than 5MB.",
			);
			return;
		}

		if (!photo.type.startsWith("image/")) {
			toast.error(
				"The file type is not supported. Please select an image file.",
			);
			return;
		}

		setIsPending(true);
		const fd = new FormData();
		if (photo) fd.append("photo", photo);

		const result = await uploadPhotoAndIdentifyPlantAction(fd);
		setIsPending(false);

		if (result?.validationErrors) {
			toast.error(result.validationErrors.photo?._errors);
		} else if (result?.serverError) {
			toast.error(`Server error: ${result.serverError}`);
		} else if (!result?.data?.success) {
			toast.error(`${result?.data?.message}`);
		} else if (result?.data?.success) {
			toast.success("Photo uploaded successfully!");
		}
	};

	return (
		<section className="flex flex-col gap-2">
			<Input
				type="file"
				name="photo"
				placeholder="Select an image"
				accept="image/*"
				onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
			/>
			<Button variant="secondary" onClick={processPhoto} disabled={isPending}>
				{isPending ? "Processing..." : "Upload"}
			</Button>
		</section>
	);
};

export default UploadPhoto;
