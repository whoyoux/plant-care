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
import { auth, signIn, signOut } from "@/lib/auth";
import type { Session } from "next-auth";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LINKS = [
	{
		href: "/features",
		label: "Features",
	},
	{
		href: "/screenshots",
		label: "Screenshots",
	},
	{
		href: "/about",
		label: "About",
	},
	{
		href: "/contact",
		label: "Contact",
	},
];

const Header = async () => {
	const session = await auth();
	return (
		<header className="w-full flex items-center justify-between px-8 py-8">
			<Link href="/">
				<h1 className="text-lg text-primary font-semibold flex items-center gap-2">
					<Leaf />
					PlantCare
				</h1>
			</Link>
			<DesktopNav className="hidden md:flex" user={session?.user} />
			<MobileNav className="flex md:hidden" user={session?.user} />
		</header>
	);
};

type DesktopNavProps = {
	className?: string;
} & UserProps;

const DesktopNav = ({ className, user }: DesktopNavProps) => {
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
			<DesktopUser user={user} />
		</nav>
	);
};

type MobileNavProps = {
	className?: string;
} & UserProps;

const MobileNav = ({ className, user }: MobileNavProps) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" className={cn(className)}>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className="text-lg text-primary font-semibold flex items-center gap-2">
						<Leaf />
						PlantCare
					</SheetTitle>
					<SheetDescription className="text-left">
						Identify and Care for Your Plants
					</SheetDescription>
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
					<MobileUser user={user} />
				</nav>
			</SheetContent>
		</Sheet>
	);
};

type UserProps = {
	user?: Session["user"];
};
const DesktopUser = ({ user }: UserProps) => {
	if (user) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size="icon" variant="ghost" className="rounded-full">
						<Avatar>
							<AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
							<AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="min-w-56 mx-4">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<Link href="/dashboard">
						<DropdownMenuItem>Dashboard</DropdownMenuItem>
					</Link>
					<DropdownMenuItem>
						My balance:
						<span className="font-semibold text-primary pl-1">
							{user.balance}
						</span>
					</DropdownMenuItem>
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuSeparator />
					<SignOut>
						<DropdownMenuItem className="w-full text-red-500">
							Sign Out
						</DropdownMenuItem>
					</SignOut>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	return <SignInButton />;
};

const MobileUser = ({ user }: UserProps) => {
	const logout = async () => {
		"use server";
		await signOut({ redirectTo: "/" });
	};
	if (user) {
		return (
			<div className="w-full flex flex-col gap-4 pt-8	">
				<span className="text-center font-semibold">{user.name}</span>
				<Link
					href="/dashboard"
					className={cn(buttonVariants({ variant: "secondary" }))}
				>
					Dashboard
				</Link>
				<Link
					href="/balance"
					className={cn(buttonVariants({ variant: "secondary" }))}
				>
					My balance:{" "}
					<span className="font-semibold text-primary pl-1">
						{user.balance}
					</span>
				</Link>
				<Link
					href="/settings"
					className={cn(buttonVariants({ variant: "secondary" }))}
				>
					Settings
				</Link>
				<form action={logout} className="w-full">
					<Button type="submit" variant="destructive" className="w-full">
						Sign Out
					</Button>
				</form>
			</div>
		);
	}
	return <SignInButton />;
};

const SignOut = ({ children }: { children: React.ReactNode }) => {
	const logout = async () => {
		"use server";
		await signOut({ redirectTo: "/" });
	};
	return (
		<form action={logout} className="w-full">
			<button type="submit" className="w-full">
				{children}
			</button>
		</form>
	);
};

const SignInButton = () => {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("google");
			}}
		>
			<Button size="sm" variant="default">
				Sign in
			</Button>
		</form>
	);
};

export default Header;
