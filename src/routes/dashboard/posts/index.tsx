import { createFileRoute, Link } from "@tanstack/react-router";

import { fetchPosts } from "#/lib/jsonplaceholder";

export const Route = createFileRoute("/dashboard/posts/")({
    loader: () => fetchPosts(),
    component: RouteComponent,
});

function RouteComponent() {
    const posts = Route.useLoaderData();

    return (
        <div>
            <h1 className="mb-6 text-2xl font-semibold text-neutral-900">Posts</h1>

            <div className="grid gap-4 sm:grid-cols-2">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        to="/dashboard/posts/$postId"
                        params={{ postId: String(post.id) }}
                        className="group rounded-xl border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-400"
                    >
                        <span className="text-xs font-medium text-neutral-400">Post #{post.id}</span>
                        <h2 className="mt-1 font-semibold capitalize text-neutral-900 group-hover:underline">
                            {post.title}
                        </h2>
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600">{post.body}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
