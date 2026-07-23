import { Fragment } from "react/jsx-runtime";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

import { ListTodo, Newspaper, Users } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
    component: RouteComponent,
});

const sidebarItems = [
    { to: "/dashboard/users", label: "Users", icon: Users },
    { to: "/dashboard/posts", label: "Posts", icon: Newspaper },
    { to: "/dashboard/todos", label: "Todos", icon: ListTodo },
] as const;

function RouteComponent() {
    return (
        <div className="flex h-full gap-8">
            <aside className="flex w-56 shrink-0 flex-col gap-1 border-r border-neutral-200 pr-4">
                <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">Menu</p>
                {sidebarItems.map(({ to, label, icon: Icon }) => (
                    <Fragment key={to}>
                        <Link
                            to={to}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                            activeProps={{
                                className: "bg-neutral-900 text-white hover:bg-neutral-900 hover:text-white",
                            }}
                        >
                            <Icon className="size-4" />
                            {label}
                        </Link>
                    </Fragment>
                ))}
            </aside>

            <main className="min-w-0 flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
