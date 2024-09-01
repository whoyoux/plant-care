import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPlantPage() {
	return (
		<>
			<div className="max-w-screen-lg mx-auto p-4 sm:p-8 bg-card w-full flex flex-col gap-4 sm:gap-8">
				<div className="mb-4">
					<div className="flex items-center text-primary">
						<Skeleton className="w-4 h-4 mr-2 rounded-full" />
						<Skeleton className="h-4 w-24 rounded" />
					</div>
				</div>
				<div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-8">
					<div className="w-full sm:w-auto">
						<Skeleton className="w-full sm:w-[200px] h-[200px] rounded-lg" />
					</div>
					<div className="flex-1 flex flex-col gap-2 sm:gap-4">
						<Skeleton className="h-6 w-3/4 rounded" />
						<Skeleton className="h-4 w-1/2 rounded" />
						<Skeleton className="h-4 w-full rounded" />
					</div>
				</div>
				<div>
					<ul className="list list-inside space-y-2 sm:space-y-3">
						{Array.from({ length: 3 }).map((_, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: why not
							<li key={index} className="flex items-center">
								<div className="text-primary text-base sm:text-lg">&bull;</div>
								<Skeleton className="h-4 w-full rounded ml-2" />
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
