"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AVATARS } from "@/lib/constants";
import { POINTS } from "@/lib/points";
import { useApp } from "@/context/AppContext";
const streams = ["Science", "Commerce", "Humanities", "Vocational"];
const grades = ["11", "12"];
export function OnboardingModal() {
    const { user, hydrated, updateUser } = useApp();
    const [name, setName] = useState("");
    const [grade, setGrade] = useState("11");
    const [stream, setStream] = useState("Science");
    const [avatar, setAvatar] = useState(AVATARS[0]);
    if (!hydrated || user)
        return null;
    const submit = () => {
        if (!name.trim())
            return;
        const profile = {
            id: `user-${Date.now()}`,
            name: name.trim(),
            grade,
            stream,
            avatar,
            points: POINTS.onboardingBonus,
            onboardedAt: new Date().toISOString(),
            bookmarkedCareerIds: [],
            assessmentCompleted: false,
            bookmarkPointsAwarded: false,
        };
        updateUser(profile);
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm", children: _jsxs("div", { className: "w-full max-w-lg rounded-2xl border border-indigo-200 bg-white p-6 shadow-2xl dark:border-indigo-900 dark:bg-slate-900", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: "Welcome to FutureReady \uD83C\uDF93" }), _jsxs("p", { className: "mt-2 text-slate-600 dark:text-slate-400", children: ["Your zero-login career navigator. Tell us a bit about you to personalize your journey (+", POINTS.onboardingBonus, " starter pts)."] }), _jsxs("label", { className: "mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300", children: ["What's your name?", _jsx("input", { value: name, onChange: (e) => setName(e.target.value), className: "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800", placeholder: "Your first name" })] }), _jsxs("div", { className: "mt-4 grid grid-cols-2 gap-4", children: [_jsxs("label", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: ["Grade", _jsx("select", { value: grade, onChange: (e) => setGrade(e.target.value), className: "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800", children: grades.map((g) => (_jsxs("option", { value: g, children: ["Grade ", g] }, g))) })] }), _jsxs("label", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: ["Stream", _jsx("select", { value: stream, onChange: (e) => setStream(e.target.value), className: "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800", children: streams.map((s) => (_jsx("option", { value: s, children: s }, s))) })] })] }), _jsx("p", { className: "mt-4 text-sm font-medium text-slate-700 dark:text-slate-300", children: "Pick your avatar" }), _jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: AVATARS.map((a) => (_jsx("button", { type: "button", onClick: () => setAvatar(a), className: `rounded-xl border-2 px-4 py-2 text-2xl ${avatar === a
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                            : "border-transparent bg-slate-100 dark:bg-slate-800"}`, children: a }, a))) }), _jsx("button", { type: "button", onClick: submit, disabled: !name.trim(), className: "mt-6 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50", children: "Let's Get Started" })] }) }));
}
