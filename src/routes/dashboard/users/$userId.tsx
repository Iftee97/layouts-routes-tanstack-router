import { createFileRoute, Link } from "@tanstack/react-router";

import { ArrowLeft, Building2, Globe, Mail, MapPin, Phone } from "lucide-react";

import { fetchPostsByUser, fetchUser } from "#/lib/jsonplaceholder";

export const Route = createFileRoute("/dashboard/users/$userId")({
    loader: async ({ params }) => {
        const userId = Number(params.userId);
        const [user, posts] = await Promise.all([fetchUser(userId), fetchPostsByUser(userId)]);
        return { user, posts };
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { user, posts } = Route.useLoaderData();

    return (
        <div className="max-w-3xl">
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

            <h2 className="mb-3 mt-8 text-lg font-semibold text-neutral-900">
                Posts by {user.name}
                <span className="ml-2 text-sm font-normal text-neutral-500">({posts.length})</span>
            </h2>

            <div className="space-y-3">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        to="/dashboard/posts/$postId"
                        params={{ postId: String(post.id) }}
                        className="group block rounded-xl border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-400"
                    >
                        <h3 className="font-semibold capitalize text-neutral-900 group-hover:underline">
                            {post.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{post.body}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
