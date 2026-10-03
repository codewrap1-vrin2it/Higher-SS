"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FLOATING_BADGES } from "@/lib/constants";
export function FloatingBadges() {
    return (_jsx("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: FLOATING_BADGES.map((badge, i) => (_jsx("div", { className: "pointer-events-auto absolute animate-float", style: {
                top: `${12 + (i % 3) * 22}%`,
                left: `${8 + i * 17}%`,
                animationDelay: `${i * 0.4}s`,
            }, children: _jsxs("div", { className: "group relative cursor-default rounded-2xl border border-white/40 bg-white/80 px-3 py-2 shadow-md backdrop-blur transition hover:rotate-3 dark:border-slate-600 dark:bg-slate-800/80", children: [_jsxs("span", { className: "text-sm font-semibold text-slate-800 dark:text-slate-100", children: [badge.emoji, " ", _jsx("em", { className: "not-italic text-indigo-600 dark:text-indigo-300", children: badge.label })] }), _jsx("div", { className: "absolute bottom-full left-1/2 mb-2 hidden w-48 -translate-x-1/2 rounded-lg bg-slate-900 px-2 py-1 text-xs text-white group-hover:block", children: badge.tip })] }) }, badge.label))) }));
}
