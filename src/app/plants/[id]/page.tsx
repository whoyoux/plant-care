import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
	ArrowLeft,
	Check,
	Cylinder,
	Droplet,
	Leaf,
	MoreHorizontal,
	Sprout,
	Sun,
	ThermometerSun,
	Wind,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const PlantPage = async ({ params: { id } }: { params: { id: string } }) => {
	const session = await auth();
	if (!session?.user) {
		return notFound();
	}

	const plant = await prisma.imageResult.findUnique({
		where: {
			id,
			user: {
				id: session.user.id,
			},
		},
		include: {
			imageFile: true,
		},
	});

	if (!plant) {
		return notFound();
	}

	if (!plant.isFound) {
		return (
			<div className="max-w-screen-lg mx-auto p-8 bg-card w-full flex flex-col gap-8">
				<div className="mb-4">
					<Link
						href="/plants"
						className="flex items-center text-primary hover:underline"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Plants
					</Link>
				</div>
				<div className="w-full flex flex-row gap-8">
					<div>
						<Image src={plant.imageFile.url} alt="" width={200} height={200} />
					</div>
					<div className="flex-1 flex flex-col gap-4">
						<h2 className="text-2xl font-semibold">Plant not found</h2>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-screen-lg mx-auto p-4 sm:p-8 bg-card w-full flex flex-col gap-4 sm:gap-8">
			<div className="mb-4">
				<Link
					href="/plants"
					className="flex items-center text-primary hover:underline"
				>
					<ArrowLeft className="w-4 h-4 mr-2" />
					Back to Plants
				</Link>
			</div>
			<div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-8">
				<div className="w-full sm:w-auto relative aspect-video min-w-[200px] md:max-w-[320px] flex-1">
					<Image
						src={plant.imageFile.url}
						alt=""
						fill
						priority
						className="w-full sm:w-[200px] h-auto object-cover rounded-lg"
					/>
				</div>
				<div className="flex-1 flex flex-col gap-2 sm:gap-4">
					<h2 className="text-xl sm:text-2xl font-semibold">{plant.name}</h2>
					<h3 className="text-base sm:text-lg font-medium text-muted-foreground">
						{plant.scientificName}
					</h3>
					<p className="text-sm text-muted-foreground">{plant.description}</p>
				</div>
			</div>
			<div className="mt-4">
				<ul className="list list-inside flex flex-col gap-6">
					{[
						{ label: "Watering", value: plant.watering, Icon: Droplet },
						{ label: "Light", value: plant.light, Icon: Sun },
						{ label: "Soil", value: plant.soil, Icon: Leaf },
						{
							label: "Temperature",
							value: plant.temperature,
							Icon: ThermometerSun,
						},
						{ label: "Humidity", value: plant.humidity, Icon: Wind },
						{
							label: "Fertilization",
							value: plant.fertilization,
							Icon: Sprout,
						},
						{ label: "Repotting", value: plant.repotting, Icon: Cylinder },
						{ label: "Other", value: plant.other, Icon: MoreHorizontal },
					].map((step) => (
						<li key={step.label} className="text-sm sm:text-base">
							<div className="flex items-center gap-2">
								<div className="aspect-square w-10 h-10 rounded-full bg-primary/10 grid place-items-center">
									<step.Icon className="text-primary text-base sm:text-lg inline-block" />
								</div>
								<strong>{step.label}</strong>
							</div>
							<p className="text-muted-foreground mt-2 leading-relaxed">
								{step.value}
							</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default PlantPage;
