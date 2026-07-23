import { Fragment } from "react";
import { Link } from "@tanstack/react-router";

import { Boxes } from "lucide-react";

const navLinks = [
    { to: "/", label: "Home", exact: true },
    { to: "/about", label: "About", exact: false },
    { to: "/dashboard", label: "Dashboard", exact: false },
] as const;

export default function Header() {
    return (
        <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-8 py-3">
            <Link to="/" className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-neutral-900 text-white">
                    <Boxes className="size-4.5" />
                </span>
                <span className="text-base font-semibold tracking-tight text-neutral-900">TanStack Router</span>
            </Link>

            <nav className="flex items-center gap-1">
                {navLinks.map(({ to, label, exact }) => (
                    <Fragment key={to}>
                        <Link
                            to={to}
                            activeOptions={{ exact }}
                            className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                            activeProps={{ className: "bg-neutral-100 text-neutral-900" }}
                        >
                            {label}
                        </Link>
                    </Fragment>
                ))}
            </nav>
        </header>
    );
}
