import { Fragment, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import type { Comment, Post, User } from "#/lib/jsonplaceholder";

type PostDetailProps = {
    post: Post;
    author: User;
    comments: Comment[];
    backLink: ReactNode;
};

function initials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export default function PostDetail({ post, author, comments, backLink }: PostDetailProps) {
    return (
        <div
        // className="max-w-3xl"
        >
            {backLink}

            <article className="mt-4 rounded-xl border border-neutral-200 bg-white p-6">
                <span className="text-xs font-medium text-neutral-400">Post #{post.id}</span>
                <h1 className="mt-1 text-2xl font-semibold capitalize text-neutral-900">{post.title}</h1>

                <Link
                    to="/dashboard/users/$userId"
                    params={{ userId: String(author.id) }}
                    className="group mt-4 flex w-fit items-center gap-3 rounded-lg border border-neutral-200 p-2.5 pr-4 transition-colors hover:border-neutral-400"
                >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                        {initials(author.name)}
                    </span>
                    <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-neutral-900 group-hover:underline">
                            {author.name}
                        </span>
                        <span className="block truncate text-xs text-neutral-500">{author.email}</span>
                    </span>
                </Link>

                <p className="mt-5 leading-relaxed text-neutral-700">{post.body}</p>
            </article>

            <h2 className="mb-3 mt-8 text-lg font-semibold text-neutral-900">
                Comments
                <span className="ml-2 text-sm font-normal text-neutral-500">({comments.length})</span>
            </h2>

            <div className="space-y-3">
                {comments.map((comment) => (
                    <Fragment key={comment.id}>
                        <div className="rounded-xl border border-neutral-200 bg-white p-5">
                            <div className="flex items-baseline justify-between gap-3">
                                <p className="font-medium capitalize text-neutral-900">{comment.name}</p>
                                <span className="shrink-0 text-xs text-neutral-400">{comment.email}</span>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{comment.body}</p>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
