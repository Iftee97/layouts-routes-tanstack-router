import { createFileRoute, Link } from "@tanstack/react-router";

import { Building2, ChevronRight, Mail } from "lucide-react";

import Skeleton from "#/components/skeleton";

import { fetchUsers } from "#/lib/jsonplaceholder";

export const Route = createFileRoute("/dashboard/users/")({
    loader: () => fetchUsers(),
    component: RouteComponent,
    pendingComponent: PendingComponent,
});

function initials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function RouteComponent() {
    const users = Route.useLoaderData();

    return (
        <div>
            <h1 className="mb-6 text-2xl font-semibold text-neutral-900">Users</h1>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {users.map((user) => (
                    <Link
                        key={user.id}
                        to="/dashboard/users/$userId"
                        params={{ userId: String(user.id) }}
                        className="group rounded-xl border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-400"
                    >
                        <div className="flex items-center gap-3">
                            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                                {initials(user.name)}
                            </span>
                            <div className="min-w-0">
                                <p className="truncate font-medium text-neutral-900">{user.name}</p>
                                <p className="truncate text-sm text-neutral-500">@{user.username}</p>
                            </div>
                            <ChevronRight className="ml-auto size-4 shrink-0 text-neutral-300 transition-colors group-hover:text-neutral-600" />
                        </div>

                        <dl className="mt-4 space-y-2 text-sm text-neutral-600">
                            <div className="flex items-center gap-2">
                                <Mail className="size-4 shrink-0 text-neutral-400" />
                                <span className="truncate">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Building2 className="size-4 shrink-0 text-neutral-400" />
                                <span className="truncate">{user.company.name}</span>
                            </div>
                        </dl>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function PendingComponent() {
    return (
        <div>
            <Skeleton className="mb-6 h-8 w-40" />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-xl border border-neutral-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <Skeleton className="size-10 shrink-0 rounded-full" />
                            <div className="min-w-0 flex-1">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="mt-1.5 h-3 w-20" />
                            </div>
                            <ChevronRight className="ml-auto size-4 shrink-0 text-neutral-200" />
                        </div>

                        <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2">
                                <Mail className="size-4 shrink-0 text-neutral-300" />
                                <Skeleton className="h-3.5 w-40" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Building2 className="size-4 shrink-0 text-neutral-300" />
                                <Skeleton className="h-3.5 w-28" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
