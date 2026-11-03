import { Fragment } from "react";

import Skeleton from "#/components/skeleton";

export default function CommentsSkeleton() {
    return (
        <>
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
        </>
    );
}
