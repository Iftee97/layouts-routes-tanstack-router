import { createFileRoute, Link } from "@tanstack/react-router";

import { ArrowLeft } from "lucide-react";
import PostDetail from "#/components/post-detail";

import { fetchPost, fetchPostComments, fetchUser } from "#/lib/jsonplaceholder";

export const Route = createFileRoute("/dashboard/users/$userId/posts/$postId")({
    loader: async ({ params }) => {
        const postId = Number(params.postId);

        const post = await fetchPost(postId);

        const [author, comments] = await Promise.all([fetchUser(post.userId), fetchPostComments(postId)]);

        return { post, author, comments };
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { post, author, comments } = Route.useLoaderData();

    const { userId } = Route.useParams();

    return (
        <PostDetail
            post={post}
            author={author}
            comments={comments}
            backLink={
                <Link
                    to="/dashboard/users/$userId"
                    params={{ userId }}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
                >
                    <ArrowLeft className="size-4" />
                    Back to user
                </Link>
            }
        />
    );
}
