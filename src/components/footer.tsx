import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Footer = () => {
	return (
		<footer className="w-full px-4 md:px-8 py-8 bg-card flex items-center justify-between mt-10">
			<h5 className="text-primary self-start md:self-auto">PlantCare</h5>
			<nav className="flex flex-col md:flex-row items-center">
				<Link
					href="/#features"
					className={cn(buttonVariants({ variant: "link" }), "text-xs")}
				>
					Features
				</Link>
				<Link
					href="/#features"
					className={cn(buttonVariants({ variant: "link" }), "text-xs")}
				>
					Features
				</Link>
				<Link
					href="/features"
					className={cn(buttonVariants({ variant: "link" }), "text-xs")}
				>
					Contact
				</Link>
			</nav>
		</footer>
	);
};

export default Footer;
