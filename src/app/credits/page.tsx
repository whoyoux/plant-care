import { Check, Leaf, type LucideProps, Sprout, Trees } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { PLANS } from "@prisma/client";

type Plan = {
	name: string;
	type: PLANS;
	icon: React.FC<LucideProps>;
	credits: number;
	price: number;
	features: string[];
};

const plans: Plan[] = [
	{
		name: "Seedling",
		type: "BASIC",
		icon: Sprout,
		credits: 50,
		price: 4.99,
		features: [
			"Basic plant identification",
			"5 identifications per day",
			"Access to plant care tips",
		],
	},
	{
		name: "Blooming",
		type: "MEDIUM",
		icon: Leaf,
		credits: 200,
		price: 14.99,
		features: [
			"Advanced plant identification",
			"20 identifications per day",
			"Detailed plant care guides",
			"Plant disease diagnosis",
		],
	},
	{
		name: "Forest",
		type: "PRO",
		icon: Trees,
		credits: 500,
		price: 29.99,
		features: [
			"Expert plant identification",
			"Unlimited identifications",
			"Comprehensive plant database access",
			"Priority customer support",
			"Exclusive botanical webinars",
		],
	},
];

export default async function CreditsPage() {
	return (
		<div className="container mt-10">
			<div className="flex flex-col items-center gap-4">
				<h2 className="text-2xl md:text-4xl font-bold text-center">
					Choose Your Plan
				</h2>
				<p className="text-lg md:text-xl text-center text-muted-foreground mb-12">
					Unlock the power of plant identification
				</p>
			</div>
			<div className="flex flex-col lg:flex-row  gap-4">
				{plans.map((plan) => (
					<PlanCard key={plan.name} plan={plan} />
				))}
			</div>
		</div>
	);
}

const PlanCard = ({ plan }: { plan: (typeof plans)[number] }) => {
	return (
		<Card key={plan.name} className="flex flex-col flex-1">
			<CardHeader>
				<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
					<plan.icon className="w-6 h-6 text-green-600" />
				</div>
				<CardTitle className="text-2xl font-bold ">{plan.name}</CardTitle>
				<CardDescription className="text-primary">
					{plan.credits} Credits
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-grow">
				<div className="flex items-baseline mb-6">
					<p className="text-3xl font-bold text-primary">${plan.price}</p>
					<span className="ml-2 text-sm text-muted-foreground">
						one-time payment
					</span>
				</div>
				<ul className="space-y-2">
					{plan.features.map((feature) => (
						<li key={feature} className="flex items-center">
							<Check className="w-5 h-5 mr-2 text-green-500" />
							{feature}
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter>
				<form
					action={async () => {
						"use server";
						const fd = new FormData();
						fd.append("plan", plan.type);
					}}
				>
					<Button
						className="w-full bg-green-600 hover:bg-green-700 text-white"
						type="submit"
					>
						Choose Plan
					</Button>
				</form>
			</CardFooter>
		</Card>
	);
};
