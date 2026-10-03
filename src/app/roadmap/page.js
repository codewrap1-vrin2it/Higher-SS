import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle2, Circle } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, } from "recharts";
import { roadmapMilestones, STAGE_LABELS } from "@/data/roadmap";
import { useApp } from "@/context/AppContext";
export default function RoadmapPage() {
    const { roadmapDone, toggleRoadmapItem } = useApp();
    const byStage = [1, 2, 3].map((stage) => ({
        stage,
        label: STAGE_LABELS[stage],
        items: roadmapMilestones.filter((m) => m.stage === stage),
    }));
    const chartData = byStage.map(({ stage, label, items }) => ({
        name: `Stage ${stage}`,
        label,
        done: items.filter((i) => roadmapDone.includes(i.id)).length,
        total: items.length,
    }));
    const totalDone = roadmapDone.length;
    const total = roadmapMilestones.length;
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Personalized Roadmap" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: "Mark milestones done \u2014 progress saves automatically (+30 pts each)." })] }), _jsxs("div", { className: "rounded-2xl border bg-white p-4 dark:border-slate-800 dark:bg-slate-900", children: [_jsx("h2", { className: "font-semibold", children: "Progress by stage" }), _jsx("div", { className: "mt-4 h-48", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: chartData, children: [_jsx(XAxis, { dataKey: "name", tick: { fontSize: 12 } }), _jsx(YAxis, { allowDecimals: false }), _jsx(Tooltip, { formatter: (value, _name, props) => [
                                            `${value} / ${props.payload.total}`,
                                            "Completed",
                                        ] }), _jsx(Bar, { dataKey: "done", fill: "#6366f1", radius: [6, 6, 0, 0] })] }) }) }), _jsxs("p", { className: "text-center text-sm text-slate-600", children: ["Overall: ", totalDone, " / ", total, " milestones (", Math.round((totalDone / total) * 100), "%)"] })] }), _jsx("div", { className: "relative space-y-12 border-l-2 border-indigo-200 pl-6 dark:border-indigo-900", children: byStage.map(({ stage, label, items }) => (_jsxs("section", { className: "relative", children: [_jsx("span", { className: "absolute -left-[1.65rem] flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white", children: stage }), _jsx("h2", { className: "text-lg font-bold", children: label }), _jsx("ul", { className: "mt-4 space-y-3", children: items.map((m) => {
                                const done = roadmapDone.includes(m.id);
                                return (_jsx("li", { children: _jsxs("button", { type: "button", onClick: () => toggleRoadmapItem(m.id), className: `flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${done
                                            ? "border-emerald-300 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
                                            : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"}`, children: [done ? (_jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 shrink-0 text-emerald-600" })) : (_jsx(Circle, { className: "mt-0.5 h-5 w-5 shrink-0 text-slate-400" })), _jsxs("span", { children: [_jsx("span", { className: "font-medium", children: m.title }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: m.description })] })] }) }, m.id));
                            }) })] }, stage))) })] }));
}
