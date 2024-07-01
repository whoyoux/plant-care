import { cn } from "@/lib/utils";
import { Leaf, Menu } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const LINKS = [
	{
		href: "/features",
		label: "Features",
	},
	{
		href: "/features",
		label: "Screenshots",
	},
	{
		href: "/features",
		label: "About",
	},
	{
		href: "/features",
		label: "Contact",
	},
];

const Header = () => {
	return (
		<header className="w-full flex items-center justify-between px-8 py-8">
			<Link href="/">
				<h1 className="text-lg text-primary font-semibold flex items-center gap-2">
					<Leaf />
					PlantCare
				</h1>
			</Link>
			<DesktopNav className="hidden md:flex" />
			<MobileNav className="flex md:hidden" />
		</header>
	);
};

const DesktopNav = ({ className }: { className?: string }) => {
	return (
		<nav className={cn("flex gap-2 items-center", className)}>
			{LINKS.map((link) => (
				<Link
					href={link.href}
					className={cn(buttonVariants({ variant: "link" }))}
					key={`dekstop${link.href}`}
				>
					{link.label}
				</Link>
			))}
			<Button>Sign in</Button>
		</nav>
	);
};

const MobileNav = ({ className }: { className?: string }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" className={cn(className)}>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>
						<h1 className="text-lg text-primary font-semibold flex items-center gap-2">
							<Leaf />
							PlantCare
						</h1>
					</SheetTitle>
				</SheetHeader>
				<nav className="flex flex-col gap-4 items-center pt-10">
					{LINKS.map((link) => (
						<Link
							href={link.href}
							className={cn(buttonVariants({ variant: "link" }))}
							key={`mobile${link.href}`}
						>
							{link.label}
						</Link>
					))}
					<Button className="w-full">Sign in</Button>
				</nav>
			</SheetContent>
		</Sheet>
	);
};

export default Header;
