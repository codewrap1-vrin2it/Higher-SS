"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Legend, } from "recharts";
import { SKILL_KEYS } from "@/lib/constants";
export function SkillRadar({ userSkills, benchmark, }) {
    const data = SKILL_KEYS.map((skill) => ({
        skill,
        You: userSkills[skill],
        Benchmark: benchmark ? benchmark[skill] : userSkills[skill],
    }));
    return (_jsx("div", { className: "h-80 w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(RadarChart, { data: data, children: [_jsx(PolarGrid, {}), _jsx(PolarAngleAxis, { dataKey: "skill", tick: { fontSize: 11 } }), _jsx(PolarRadiusAxis, { angle: 30, domain: [0, 5] }), _jsx(Radar, { name: "You", dataKey: "You", stroke: "#6366f1", fill: "#6366f1", fillOpacity: 0.4 }), benchmark && (_jsx(Radar, { name: "Career benchmark", dataKey: "Benchmark", stroke: "#a78bfa", fill: "#a78bfa", fillOpacity: 0.2 })), _jsx(Legend, {})] }) }) }));
}
