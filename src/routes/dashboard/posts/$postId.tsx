import { createFileRoute, Link } from "@tanstack/react-router";

import { ArrowLeft } from "lucide-react";

import { fetchPost, fetchPostComments } from "#/lib/jsonplaceholder";

export const Route = createFileRoute("/dashboard/posts/$postId")({
    loader: async ({ params }) => {
        const postId = Number(params.postId);
        const [post, comments] = await Promise.all([fetchPost(postId), fetchPostComments(postId)]);
        return { post, comments };
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { post, comments } = Route.useLoaderData();

    return (
        <div className="max-w-3xl">
            <Link
                to="/dashboard/posts"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
            >
                <ArrowLeft className="size-4" />
                Back to posts
            </Link>

            <article className="mt-4 rounded-xl border border-neutral-200 bg-white p-6">
                <span className="text-xs font-medium text-neutral-400">Post #{post.id}</span>
                <h1 className="mt-1 text-2xl font-semibold capitalize text-neutral-900">{post.title}</h1>
                <p className="mt-3 leading-relaxed text-neutral-700">{post.body}</p>
            </article>

            <h2 className="mb-3 mt-8 text-lg font-semibold text-neutral-900">
                Comments
                <span className="ml-2 text-sm font-normal text-neutral-500">({comments.length})</span>
            </h2>

            <div className="space-y-3">
                {comments.map((comment) => (
                    <div key={comment.id} className="rounded-xl border border-neutral-200 bg-white p-5">
                        <div className="flex items-baseline justify-between gap-3">
                            <p className="font-medium capitalize text-neutral-900">{comment.name}</p>
                            <span className="shrink-0 text-xs text-neutral-400">{comment.email}</span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-600">{comment.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
