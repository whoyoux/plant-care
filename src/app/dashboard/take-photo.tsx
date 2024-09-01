"use client";
import { Button } from "@/components/ui/button";
import { CameraOff as CameraOffIcon, RefreshCcw } from "lucide-react";
import { useRef, useState } from "react";

import { Camera, type CameraType } from "react-camera-pro";
import { toast } from "sonner";
import { uploadPhotoAndIdentifyPlantAction } from "./actions";
import { useRouter } from "next/navigation";

const base64ToFile = async (base64: string, filename: string) => {
	const response = await fetch(base64);
	const blob = await response.blob();
	return new File([blob], filename);
};

const TakePhoto = () => {
	const router = useRouter();
	const [isPending, setIsPending] = useState(false);
	const [numberOfCameras, setNumberOfCameras] = useState(0);
	const [photo, setPhoto] = useState<string | null>(null);
	const cameraRef = useRef<CameraType>(null);

	const takePhoto = async () => {
		setIsPending(true);
		const photo = cameraRef.current?.takePhoto?.();

		if (!photo) {
			toast.error("No photo taken. Please try again.");
			setIsPending(false);
			return;
		}
		setPhoto(photo.toString());
		const photoFile = await base64ToFile(photo.toString(), "photo.jpg");

		const fd = new FormData();
		fd.append("photo", photoFile);

		const result = await uploadPhotoAndIdentifyPlantAction(fd);

		if (result?.validationErrors) {
			toast.error(result.validationErrors.photo?._errors);
		} else if (result?.serverError) {
			toast.error(`Server error: ${result.serverError}`);
		} else if (!result?.data?.success) {
			toast.error(`${result?.data?.message}`);
		} else if (result?.data?.success) {
			toast.success("Photo uploaded successfully!");
			router.push(`/plants/${result.data.plantId}`);
		}
		setPhoto(null);
		setIsPending(false);
	};
	const flipCamera = () => {
		cameraRef.current?.switchCamera();
	};
	return (
		<section className="flex flex-col gap-4">
			<h1 className="text-center text-2xl font-bold">What plant is that?</h1>
			<div className="aspect-square bg-muted flex items-center justify-center w-full relative border">
				<CameraOffIcon className="absolute -z-10" />
				{photo && <img src={photo} alt="plant" />}
				<Camera
					ref={cameraRef}
					facingMode="environment"
					aspectRatio={1}
					numberOfCamerasCallback={setNumberOfCameras}
					errorMessages={{
						noCameraAccessible:
							"No camera device accessible. Please connect your camera or try a different browser.",
						permissionDenied:
							"Permission denied. Please refresh and give camera permission.",
						switchCamera:
							"It is not possible to switch camera to different one because there is only one video device accessible.",
						canvas: "Canvas is not supported.",
					}}
				/>
			</div>
			<div className="flex gap-2">
				<Button onClick={takePhoto} className="flex-1" disabled={isPending}>
					{isPending ? "Processing..." : "Identify plant (costs 1 credit)"}
				</Button>
				{numberOfCameras > 1 && (
					<Button size="icon" variant="secondary" onClick={flipCamera}>
						<RefreshCcw />
					</Button>
				)}
			</div>
		</section>
	);
};

export default TakePhoto;
