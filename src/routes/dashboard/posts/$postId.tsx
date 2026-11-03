import { createFileRoute, Link } from "@tanstack/react-router";

import { ArrowLeft } from "lucide-react";
import PostDetail from "#/components/post-detail";
import PostDetailSkeleton from "#/components/post-detail-skeleton";

import { fetchPost, fetchPostComments, fetchUser } from "#/lib/jsonplaceholder";

export const Route = createFileRoute("/dashboard/posts/$postId")({
    loader: async ({ params }) => {
        const postId = Number(params.postId);

        const commentsPromise = fetchPostComments(postId);

        const post = await fetchPost(postId);
        const author = await fetchUser(post.userId);

        return { post, author, commentsPromise };
    },
    component: RouteComponent,
    pendingComponent: PostDetailSkeleton,
});

function RouteComponent() {
    const { post, author, commentsPromise } = Route.useLoaderData();

    return (
        <PostDetail
            post={post}
            author={author}
            commentsPromise={commentsPromise}
            backLink={
                <Link
                    to="/dashboard/posts"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
                >
                    <ArrowLeft className="size-4" />
                    Back to posts
                </Link>
            }
        />
    );
}
