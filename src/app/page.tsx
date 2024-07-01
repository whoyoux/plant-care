import heroImg from "@/assets/hero.png";
import plantInPot from "@/assets/plant-in-pot.png";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { auth, signIn } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
	const session = await auth();
	return (
		<main>
			<section className="flex flex-col-reverse md:flex-row gap-8 items-center px-8 md:px-12 py-44 w-full md:justify-between max-w-screen-2xl mx-auto">
				<div className="flex flex-col gap-4">
					<h1 className="text-2xl md:text-4xl font-bold ">
						Identify Plants with Ease
					</h1>
					<p className="text-muted-foreground text-lg md:text-xl">
						Our plant identification app makes it simple to identify plants in
						your garden or on your hikes. Just snap a photo and let our AI do
						the rest.
					</p>
					<div>
						{session?.user ? (
							<Link
								href="/dashboard"
								className={cn(buttonVariants({ variant: "default" }))}
							>
								Get started
							</Link>
						) : (
							<form
								action={async () => {
									"use server";
									await signIn("google");
								}}
							>
								<Button type="submit">Sign in</Button>
							</form>
						)}
					</div>
				</div>
				<div>
					<Image
						src={heroImg}
						alt="A small plant in a pot"
						className="max-w-[300px] h-auto"
						placeholder="blur"
						width={300}
						height={300}
					/>
				</div>
			</section>
			<section className="bg-card py-20 px-8 space-y-12">
				<div className="flex flex-col items-center max-w-screen-md mx-auto gap-4">
					<Badge>Key Features</Badge>
					<h2 className="text-2xl font-bold">Powerful Plant Recognition</h2>
					<p className="text-center text-muted-foreground text-lg">
						Our app uses advanced image recognition technology to identify
						thousands of plant species. Get detailed information, care tips, and
						more with just a snap of your camera.
					</p>
				</div>
				<div className="w-full flex flex-col-reverse md:flex-row items-center justify-center gap-6">
					<div className="flex flex-col gap-6 ">
						<div>
							<h3 className="text-xl font-semibold">Image Recognition</h3>
							<p className="text-muted-foreground">
								Snap a photo of any plant and our app will instantly identify
								it.
							</p>
						</div>
						<div>
							<h3 className="text-xl font-semibold">Plant Care Tips</h3>
							<p className="text-muted-foreground">
								Get personalized care instructions for your plants, including
								watering, sunlight, and more.
							</p>
						</div>
						<div>
							<h3 className="text-xl font-semibold">Plant Encyclopedia</h3>
							<p className="text-muted-foreground">
								Learn about the fascinating world of plants with our
								comprehensive database.
							</p>
						</div>
					</div>
					<Image
						src={plantInPot}
						alt=""
						className="max-w-[250px] h-auto"
						placeholder="blur"
						width={250}
						height={250}
					/>
				</div>
			</section>
			<section className="py-20 px-8 space-y-12">
				<div className="flex flex-col items-center max-w-screen-md mx-auto gap-4">
					<Badge>App Screenshots</Badge>
					<h2 className="text-2xl font-bold">Explore the App Interface</h2>
					<p className="text-center text-muted-foreground text-lg">
						Check out the clean and intuitive design of our plant recognition
						app.
					</p>
				</div>
				<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-lg mx-auto">
					<Image
						src={"https://generated.vusercontent.net/placeholder.svg"}
						alt="Screenshot of app"
						width={600}
						height={300}
						quality={50}
						className="object-cover w-full aspect-video rounded-lg"
					/>
					<Image
						src={"https://generated.vusercontent.net/placeholder.svg"}
						alt="Screenshot of app"
						width={600}
						height={300}
						quality={50}
						className="object-cover w-full aspect-video rounded-lg"
					/>
				</div>
			</section>
		</main>
	);
}
