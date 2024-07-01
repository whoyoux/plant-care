import { Button } from "@/components/ui/button";

const SignInPage = () => {
	return (
		<div>
			<form className="max-w-screen-md w-full mx-auto border p-8 flex flex-col gap-4">
				<h1 className="text-xl font-semibold">Sign in</h1>
				<Button variant="secondary">by Google</Button>
			</form>
		</div>
	);
};

export default SignInPage;
