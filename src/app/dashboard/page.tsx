import Divider from "@/components/divider";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import TakePhoto from "./take-photo";
import UploadPhoto from "./upload-photo";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const maxDuration = 60;

const DashoboardPage = async () => {
	const session = await auth();
	if (!session?.user) return notFound();

	return (
		<main className="">
			<div className="max-w-[600px] mx-auto flex flex-col gap-4 px-8">
				<TakePhoto />
				<Divider text="OR UPLOAD PHOTO" />
				<UploadPhoto />
				<div className="flex justify-between items-center">
					<p>
						Balance:{" "}
						<span className="font-bold text-primary">
							{session.user.balance}
						</span>{" "}
						credits
					</p>
					<Button size="sm" variant="outline">
						Add credits
					</Button>
				</div>
				<div className="flex justify-end">
					<Link
						href="/plants"
						className={cn(buttonVariants({ variant: "link" }), "pl-0")}
					>
						See my history
						<ArrowRight className="w-4 h-4 ml-2 " />
					</Link>
				</div>
			</div>
		</main>
	);
};

export default DashoboardPage;
