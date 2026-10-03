import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { careers } from "@/data/careers";
import { useApp } from "@/context/AppContext";
import { SkillRadar } from "@/components/SkillRadar";
import { SkillGapCard } from "@/components/SkillGapCard";
export default function DiagnosticPage() {
    var _a, _b;
    const { assessment } = useApp();
    const [careerId, setCareerId] = useState((_b = (_a = careers[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "");
    const career = useMemo(() => { var _a; return (_a = careers.find((c) => c.id === careerId)) !== null && _a !== void 0 ? _a : careers[0]; }, [careerId]);
    if (!assessment) {
        return (_jsxs("div", { className: "rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30", children: [_jsx("h1", { className: "text-xl font-bold", children: "Strength\u2013Gap Diagnostic" }), _jsx("p", { className: "mt-2 text-slate-600 dark:text-slate-400", children: "Complete the career assessment first to compare your skills against career benchmarks." }), _jsx(Link, { to: "/assessment", className: "mt-4 inline-block text-indigo-600 font-semibold", children: "Take assessment \u2192" })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Strength\u2013Gap Diagnostic" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: "Radar view: your profile vs selected career benchmark (1\u20135 scale)." })] }), _jsxs("label", { className: "block max-w-md text-sm font-medium", children: ["Select career", _jsx("select", { value: careerId, onChange: (e) => setCareerId(e.target.value), className: "mt-1 w-full rounded-lg border px-3 py-2 dark:border-slate-700 dark:bg-slate-800", children: careers.map((c) => (_jsx("option", { value: c.id, children: c.title }, c.id))) })] }), _jsx("div", { className: "rounded-2xl border bg-white p-4 dark:border-slate-800 dark:bg-slate-900", children: _jsx(SkillRadar, { userSkills: assessment.skills, benchmark: career.skillBenchmark }) }), _jsx(SkillGapCard, { userSkills: assessment.skills, benchmark: career.skillBenchmark, careerTitle: career.title })] }));
}
