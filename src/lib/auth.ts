import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [Google],
	callbacks: {
		session({ session, user }) {
			session.user.id = user.id;
			session.user.balance = user.balance ?? 0;
			return session;
		},
	},
});
