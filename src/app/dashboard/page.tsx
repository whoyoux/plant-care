import Divider from "@/components/divider";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import TakePhoto from "./take-photo";
import UploadPhoto from "./upload-photo";

const DashoboardPage = async () => {
	const session = await auth();
	if (!session?.user) return notFound();

	return (
		<main className="min-h-[calc(100dvh-208px)]">
			<div className="max-w-[600px] mx-auto flex flex-col gap-4 px-8">
				<TakePhoto />
				<Divider text="OR" />
				<UploadPhoto />
			</div>
		</main>
	);
};

export default DashoboardPage;