import type { Metadata } from "next";
import "./globals.css";

import { Inter as FontSans } from "next/font/google";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
