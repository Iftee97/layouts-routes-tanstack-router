import { Fragment } from "react/jsx-runtime";

import Skeleton from "#/components/skeleton";

export default function PostDetailSkeleton() {
    return (
        <div className="max-w-3xl">
            <Skeleton className="h-4 w-28" />

            <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-6">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="mt-2 h-7 w-3/4" />

                <div className="mt-4 flex w-fit items-center gap-3 rounded-lg border border-neutral-200 p-2.5 pr-4">
                    <Skeleton className="size-9 shrink-0 rounded-full" />
                    <div>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="mt-1.5 h-3 w-40" />
                    </div>
                </div>

                <div className="mt-5 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>

            <Skeleton className="mb-3 mt-8 h-6 w-40" />

            <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Fragment key={i}>
                        <div className="rounded-xl border border-neutral-200 bg-white p-5">
                            <div className="flex items-baseline justify-between gap-3">
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                            <Skeleton className="mt-2 h-3.5 w-full" />
                            <Skeleton className="mt-2 h-3.5 w-4/5" />
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
