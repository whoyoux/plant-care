import {
	DEFAULT_SERVER_ERROR_MESSAGE,
	createSafeActionClient,
} from "next-safe-action";
import { z } from "zod";
import { auth } from "./auth";

export class ActionError extends Error {}

export const action = createSafeActionClient({
	handleReturnedServerError(e) {
		if (e instanceof ActionError) {
			return e.message;
		}

		return DEFAULT_SERVER_ERROR_MESSAGE;
	},
	defineMetadataSchema() {
		return z.object({
			actionName: z.string(),
		});
	},
});

export const authAction = action.use(async ({ next }) => {
	const session = await auth();
	if (!session?.user) {
		throw new ActionError("Unauthorized");
	}
	return next({ ctx: { session } });
});
