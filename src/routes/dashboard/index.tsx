import { createFileRoute, Link } from "@tanstack/react-router";

import { ArrowRight, ListTodo, Newspaper, Users } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
    component: RouteComponent,
});

const sections = [
    {
        to: "/dashboard/users",
        title: "Users",
        description: "Browse the directory of users with their contact details.",
        icon: Users,
    },
    {
        to: "/dashboard/posts",
        title: "Posts",
        description: "Read the latest posts pulled live from the API.",
        icon: Newspaper,
    },
    {
        to: "/dashboard/todos",
        title: "Todos",
        description: "Track which todo items are completed or still pending.",
        icon: ListTodo,
    },
] as const;

function RouteComponent() {
    return (
        <div>
            <header className="mb-6">
                <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
                <p className="mt-1 text-sm text-neutral-500">Pick a section to explore live data.</p>
            </header>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sections.map(({ to, title, description, icon: Icon }) => (
                    <div key={to} className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5">
                        <span className="mb-4 grid size-10 place-items-center rounded-lg bg-neutral-900 text-white">
                            <Icon className="size-5" />
                        </span>
                        <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
                        <p className="mb-5 mt-1 flex-1 text-sm text-neutral-500">{description}</p>
                        <Link
                            to={to}
                            className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-neutral-900 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
                        >
                            View {title}
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
