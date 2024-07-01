"use client";
import { Button } from "@/components/ui/button";
import { CameraOff as CameraOffIcon, RefreshCcw } from "lucide-react";
import { useRef, useState } from "react";

import { Camera, type CameraType } from "react-camera-pro";
import { toast } from "sonner";

const TakePhoto = () => {
	const [numberOfCameras, setNumberOfCameras] = useState(0);
	const cameraRef = useRef<CameraType>(null);
	const takePhoto = () => {
		const photo = cameraRef.current?.takePhoto?.();
		if (!photo) {
			toast.error("No photo taken. Please try again.");
		}
		console.log(photo);
	};
	const flipCamera = () => {
		cameraRef.current?.switchCamera();
	};
	return (
		<section className="flex flex-col gap-4">
			<h1 className="text-center text-2xl font-bold">What plant is that?</h1>
			<div className="aspect-square bg-muted flex items-center justify-center w-full relative border">
				<CameraOffIcon className="absolute z-0" />
				<Camera
					ref={cameraRef}
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
				<Button onClick={takePhoto} className="flex-1">
					Take a photo
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
