import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";
import { useApp } from "@/context/AppContext";
export function LeaderboardWidget({ compact }) {
    const { leaderboard, user } = useApp();
    const sorted = [...leaderboard].sort((a, b) => b.points - a.points);
    const userRank = user && sorted.findIndex((e) => e.isUser) >= 0
        ? sorted.findIndex((e) => e.isUser) + 1
        : null;
    const slice = compact ? sorted.slice(0, 5) : sorted;
    return (_jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "flex items-center gap-2 font-bold", children: [_jsx(Trophy, { className: "h-5 w-5 text-amber-500" }), "Leaderboard"] }), compact && (_jsx(Link, { to: "/leaderboard", className: "text-sm text-indigo-600", children: "View all" }))] }), userRank && (_jsxs("p", { className: "mt-2 text-sm text-indigo-600 dark:text-indigo-400", children: ["You \u2014 Rank #", userRank] })), _jsx("ul", { className: "mt-4 space-y-2", children: slice.map((entry, idx) => (_jsxs("li", { className: `flex items-center justify-between rounded-lg px-3 py-2 text-sm ${entry.isUser
                        ? "bg-indigo-50 font-semibold ring-2 ring-indigo-400 dark:bg-indigo-950/50"
                        : "bg-slate-50 dark:bg-slate-800/50"}`, children: [_jsxs("span", { children: ["#", idx + 1, " ", entry.avatar, " ", entry.name, entry.isUser && (_jsx("span", { className: "ml-2 rounded bg-indigo-600 px-1.5 py-0.5 text-xs text-white", children: "You" }))] }), _jsxs("span", { children: [entry.points, " pts"] })] }, entry.id))) })] }));
}
