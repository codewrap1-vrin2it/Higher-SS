"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { TrendingDown, TrendingUp } from "lucide-react";
import { skillGaps } from "@/lib/scoring";
export function SkillGapCard({ userSkills, benchmark, careerTitle, }) {
    const gaps = skillGaps(userSkills, benchmark);
    const strengths = gaps.filter((g) => g.delta >= 0.3);
    const deficits = gaps.filter((g) => g.delta <= -0.3);
    return (_jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900", children: [_jsxs("h3", { className: "font-bold", children: ["Skill Gap \u2014 ", careerTitle] }), _jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsxs("p", { className: "flex items-center gap-1 text-sm font-semibold text-emerald-600", children: [_jsx(TrendingUp, { className: "h-4 w-4" }), " Strengths"] }), _jsx("ul", { className: "mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400", children: strengths.length ? (strengths.map((g) => (_jsxs("li", { children: ["+", g.delta, " above benchmark in ", g.skill] }, g.skill)))) : (_jsx("li", { children: "Complete assessment for clearer strengths." })) })] }), _jsxs("div", { children: [_jsxs("p", { className: "flex items-center gap-1 text-sm font-semibold text-amber-600", children: [_jsx(TrendingDown, { className: "h-4 w-4" }), " Growth areas"] }), _jsx("ul", { className: "mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400", children: deficits.length ? (deficits.map((g) => (_jsxs("li", { children: [g.delta, " below benchmark in ", g.skill] }, g.skill)))) : (_jsx("li", { children: "You're close to benchmark across skills!" })) })] })] })] }));
}
