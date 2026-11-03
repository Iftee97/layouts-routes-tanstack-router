import { Fragment } from "react/jsx-runtime";
import { Await, createFileRoute, Link } from "@tanstack/react-router";

import { ArrowLeft, Building2, Globe, Mail, MapPin, Phone } from "lucide-react";
import Skeleton from "#/components/skeleton";

import { fetchPostsByUser, fetchUser, type Post, type User } from "#/lib/jsonplaceholder";

export const Route = createFileRoute("/dashboard/users/$userId/")({
    loader: async ({ params }) => {
        const userId = Number(params.userId);

        const postsPromise = fetchPostsByUser(userId);

        const user = await fetchUser(userId);

        return { user, postsPromise };
    },
    component: RouteComponent,
    pendingComponent: PendingComponent,
});

function RouteComponent() {
    const { user, postsPromise } = Route.useLoaderData();

    return (
        <div>
            <Link
                to="/dashboard/users"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
            >
                <ArrowLeft className="size-4" />
                Back to users
            </Link>

            <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-6">
                <h1 className="text-2xl font-semibold text-neutral-900">{user.name}</h1>
                <p className="text-sm text-neutral-500">@{user.username}</p>

                <dl className="mt-5 grid gap-3 text-sm text-neutral-600 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                        <Mail className="size-4 shrink-0 text-neutral-400" />
                        <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="size-4 shrink-0 text-neutral-400" />
                        <span className="truncate">{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="size-4 shrink-0 text-neutral-400" />
                        <span className="truncate">{user.website}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="size-4 shrink-0 text-neutral-400" />
                        <span className="truncate">{user.address.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Building2 className="size-4 shrink-0 text-neutral-400" />
                        <span className="truncate">{user.company.name}</span>
                    </div>
                </dl>
            </div>

            <Await promise={postsPromise} fallback={<UserPostsSkeleton />}>
                {(posts) => <UserPostList user={user} posts={posts} />}
            </Await>
        </div>
    );
}

function UserPostList({ user, posts }: { user: User; posts: Post[] }) {
    return (
        <>
            <h2 className="mb-3 mt-8 text-lg font-semibold text-neutral-900">
                Posts by {user.name}
                <span className="ml-2 text-sm font-normal text-neutral-500">({posts.length})</span>
            </h2>

            <div className="space-y-3">
                {posts.map((post) => (
                    <Fragment key={post.id}>
                        <Link
                            to="/dashboard/users/$userId/posts/$postId"
                            params={{ userId: String(user.id), postId: String(post.id) }}
                            className="group block rounded-xl border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-400"
                        >
                            <h3 className="font-semibold capitalize text-neutral-900 group-hover:underline">
                                {post.title}
                            </h3>
                            <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{post.body}</p>
                        </Link>
                    </Fragment>
                ))}
            </div>
        </>
    );
}

function PendingComponent() {
    return (
        <div>
            <Skeleton className="h-4 w-28" />

            <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-6">
                <Skeleton className="h-7 w-56" />
                <Skeleton className="mt-1.5 h-4 w-24" />

                <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[Mail, Phone, Globe, MapPin, Building2].map((Icon, i) => (
                        <Fragment key={i}>
                            <div className="flex items-center gap-2">
                                <Icon className="size-4 shrink-0 text-neutral-300" />
                                <Skeleton className="h-3.5 w-40" />
                            </div>
                        </Fragment>
                    ))}
                </dl>
            </div>

            <UserPostsSkeleton />
        </div>
    );
}

function UserPostsSkeleton() {
    return (
        <>
            <Skeleton className="mb-3 mt-8 h-6 w-48" />

            <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Fragment key={i}>
                        <div className="rounded-xl border border-neutral-200 bg-white p-5">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="mt-2 h-4 w-full" />
                            <Skeleton className="mt-1.5 h-4 w-2/3" />
                        </div>
                    </Fragment>
                ))}
            </div>
        </>
    );
}
