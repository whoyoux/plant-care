import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

type PlantCardProps = Prisma.ImageResultGetPayload<{
	include: {
		imageFile: true;
	};
}>;

const PlantsPage = async () => {
	const session = await auth();
	if (!session?.user) {
		return notFound();
	}

	const plants = await prisma.imageResult.findMany({
		where: {
			user: {
				id: session.user.id,
			},
		},
		include: {
			imageFile: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<div className="min-h-[calc(100vh-208px)]">
			<div className="mx-auto px-8 flex flex-col gap-8 max-w-screen-lg">
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-semibold">My plants</h2>
					<Link
						href="/dashboard"
						className={cn(buttonVariants({ variant: "link" }))}
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Go back to dashboard
					</Link>
				</div>
				<div className="flex flex-col gap-8">
					{plants.map((plant) => (
						<PlantCard key={plant.id} {...plant} />
					))}
				</div>
			</div>
		</div>
	);
};

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PlantCard = ({
	isFound,
	name,
	description,
	scientificName,
	errorMessage,
	imageFile,
	id,
}: PlantCardProps) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:items-start gap-4 md:gap-8 items-center border p-8 bg-card">
			<div className="w-full min-w-[200px] relative aspect-video col-span-1">
				<Image src={imageFile.url} alt="" fill className="object-cover" />
			</div>
			<div className="flex flex-col gap-2 col-span-1 md:col-span-1 lg:col-span-2">
				<Link href={`/plants/${id}`}>
					<h2
						className={cn(
							"text-xl font-semibold hover:underline underline-offset-2",
							!isFound && "text-destructive",
						)}
					>
						{isFound ? name : "Plant not recognized"}
					</h2>
				</Link>
				<p className="text-sm text-muted-foreground">
					{isFound ? description : errorMessage}
				</p>
				<div className="flex justify-end mt-2">
					<Link
						href={`/plants/${id}`}
						className={cn(buttonVariants({ variant: "default" }))}
					>
						See more
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PlantsPage;
