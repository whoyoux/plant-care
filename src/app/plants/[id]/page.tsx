import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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
	});

	return (
		<div>
			PlantPage {id} <br />
			<br />
			<br />
			<br /> {JSON.stringify(plant, null, 2)}
		</div>
	);
};

export default PlantPage;
