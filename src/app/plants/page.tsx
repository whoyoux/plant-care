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
	console.log(plants);

	return (
		<div className="min-h-[calc(100vh-208px)]">
			<div className="mx-auto px-8 flex flex-col gap-8 max-w-screen-lg">
				<h2 className="text-xl font-semibold">My plants</h2>
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

const PlantCard = ({
	isFound,
	name,
	description,
	errorMessage,
	imageFile,
	id,
}: PlantCardProps) => {
	return (
		<div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 items-center border p-8 bg-card">
			<Image src={imageFile.url} alt="" width={200} height={200} />
			<div className="flex flex-col gap-2">
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
			</div>
		</div>
	);
};

export default PlantsPage;