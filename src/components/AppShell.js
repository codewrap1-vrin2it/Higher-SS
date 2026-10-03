import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import { Briefcase, ClipboardList, Gamepad2, Home, Map, Radar, Trophy, BookOpen, } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ProfileModal } from "./ProfileModal";
const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/assessment", label: "Assessment", icon: ClipboardList },
    { href: "/diagnostic", label: "Diagnostic", icon: Radar },
    { href: "/careers", label: "Careers", icon: Briefcase },
    { href: "/roadmap", label: "Roadmap", icon: Map },
    { href: "/resources", label: "Resources", icon: BookOpen },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/game", label: "Skill Rush", icon: Gamepad2 },
];
export function AppShell({ children }) {
    const { pathname } = useLocation();
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100", children: [_jsxs("header", { className: "sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90", children: [_jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3", children: [_jsx(Link, { to: "/", className: "font-bold text-indigo-600 dark:text-indigo-400", children: "FutureReady" }), _jsx("nav", { className: "hidden flex-1 flex-wrap justify-center gap-1 md:flex", children: links.map(({ href, label, icon: Icon }) => (_jsxs(Link, { to: href, className: `flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium lg:text-sm ${pathname === href
                                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"}`, children: [_jsx(Icon, { className: "h-4 w-4" }), label] }, href))) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ThemeToggle, {}), _jsx(ProfileModal, {})] })] }), _jsx("nav", { className: "flex gap-1 overflow-x-auto border-t border-slate-100 px-2 py-2 md:hidden dark:border-slate-800", children: links.map(({ href, label, icon: Icon }) => (_jsxs(Link, { to: href, className: `flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs ${pathname === href ? "bg-indigo-100 text-indigo-700" : "text-slate-600"}`, children: [_jsx(Icon, { className: "h-3.5 w-3.5" }), label] }, href))) })] }), _jsx("main", { className: "mx-auto max-w-6xl px-4 py-8", children: children })] }));
}
