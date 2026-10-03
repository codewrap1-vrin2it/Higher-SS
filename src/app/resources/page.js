import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { resources } from "@/data/resources";
import { SKILL_KEYS } from "@/lib/constants";
export default function ResourcesPage() {
    const [skill, setSkill] = useState("All");
    const [difficulty, setDifficulty] = useState("All");
    const filtered = useMemo(() => {
        return resources.filter((r) => {
            const skillOk = skill === "All" || r.skillTags.includes(skill);
            const diffOk = difficulty === "All" || r.difficulty === difficulty;
            return skillOk && diffOk;
        });
    }, [skill, difficulty]);
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Free Resources Directory" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsxs("select", { value: skill, onChange: (e) => setSkill(e.target.value), className: "rounded-lg border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800", children: [_jsx("option", { value: "All", children: "All skills" }), SKILL_KEYS.map((k) => (_jsx("option", { value: k, children: k }, k)))] }), _jsx("select", { value: difficulty, onChange: (e) => setDifficulty(e.target.value), className: "rounded-lg border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800", children: ["All", "Beginner", "Intermediate", "Advanced"].map((d) => (_jsx("option", { value: d, children: d }, d))) })] }), _jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: filtered.map((r) => (_jsxs("article", { className: "rounded-2xl border bg-white p-5 dark:border-slate-800 dark:bg-slate-900", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsx("h2", { className: "font-bold", children: r.title }), _jsx("span", { className: "shrink-0 rounded bg-slate-100 px-2 py-0.5 text-xs dark:bg-slate-800", children: r.platform })] }), _jsx("p", { className: "mt-2 text-sm text-slate-600 dark:text-slate-400", children: r.description }), _jsxs("div", { className: "mt-3 flex flex-wrap gap-1", children: [_jsx("span", { className: "rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200", children: r.difficulty }), r.skillTags.map((t) => (_jsx("span", { className: "rounded-full bg-violet-100 px-2 py-0.5 text-xs dark:bg-violet-950", children: t }, t)))] }), _jsxs("a", { href: r.url, target: "_blank", rel: "noopener noreferrer", className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600", children: ["Open resource ", _jsx(ExternalLink, { className: "h-4 w-4" })] })] }, r.id))) })] }));
}
