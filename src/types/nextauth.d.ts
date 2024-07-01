import type { DefaultSession, User } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			balance: number;
		} & DefaultSession["user"];
	}
	interface User extends User {
		balance?: number;
	}
}
