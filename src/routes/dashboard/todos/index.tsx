import { Fragment } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";

import { Check } from "lucide-react";
import Skeleton from "#/components/skeleton";

import { fetchTodos } from "#/lib/jsonplaceholder";

export const Route = createFileRoute("/dashboard/todos/")({
    loader: () => fetchTodos(),
    component: RouteComponent,
    pendingComponent: PendingComponent,
});

function RouteComponent() {
    const todos = Route.useLoaderData();

    const completedCount = todos.filter((todo) => todo.completed).length;

    return (
        <div>
            <div className="mb-6 flex items-baseline gap-3">
                <h1 className="text-2xl font-semibold text-neutral-900">Todos</h1>
                <span className="text-sm text-neutral-500">
                    {completedCount} of {todos.length} completed
                </span>
            </div>

            <ul className="divide-y divide-neutral-200 overflow-hidden rounded-xl border border-neutral-200 bg-white">
                {todos.map((todo) => (
                    <Fragment key={todo.id}>
                        <li className="flex items-center gap-3 px-4 py-3">
                            <span
                                className={`grid size-5 shrink-0 place-items-center rounded-md border ${
                                    todo.completed ? "border-green-600 bg-green-600 text-white" : "border-neutral-300"
                                }`}
                            >
                                {todo.completed && <Check className="size-3.5" />}
                            </span>
                            <span
                                className={`text-sm ${
                                    todo.completed ? "text-neutral-400 line-through" : "text-neutral-700"
                                }`}
                            >
                                {todo.title}
                            </span>
                        </li>
                    </Fragment>
                ))}
            </ul>
        </div>
    );
}

function PendingComponent() {
    return (
        <div>
            <div className="mb-6 flex items-baseline gap-3">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-28" />
            </div>

            <ul className="divide-y divide-neutral-200 overflow-hidden rounded-xl border border-neutral-200 bg-white">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Fragment key={i}>
                        <li className="flex items-center gap-3 px-4 py-3">
                            <Skeleton className="size-5 shrink-0 rounded-md" />
                            <Skeleton className="h-4 w-2/3" />
                        </li>
                    </Fragment>
                ))}
            </ul>
        </div>
    );
}
