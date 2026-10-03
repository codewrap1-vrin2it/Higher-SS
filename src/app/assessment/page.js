import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { questions } from "@/data/questions";
import { aggregateAnswers } from "@/lib/scoring";
import { setAssessment, getUser, setUser } from "@/lib/storage";
import { POINTS } from "@/lib/points";
import { useApp } from "@/context/AppContext";
import { SkillRadar } from "@/components/SkillRadar";
export default function AssessmentPage() {
    const { assessment, refreshAssessment, awardPoints, user, updateUser } = useApp();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [finished, setFinished] = useState(false);
    const [localScores, setLocalScores] = useState(null);
    const q = questions[step];
    const progress = ((step + (finished ? 1 : 0)) / questions.length) * 100;
    const select = (opt) => {
        const next = [...answers, opt];
        setAnswers(next);
        if (step < questions.length - 1) {
            setStep(step + 1);
        }
        else {
            const scores = aggregateAnswers(next);
            const payload = Object.assign(Object.assign({}, scores), { completedAt: new Date().toISOString() });
            setAssessment(payload);
            refreshAssessment();
            setLocalScores(scores);
            setFinished(true);
            const u = getUser();
            if (u && !u.assessmentCompleted) {
                const updated = Object.assign(Object.assign({}, u), { assessmentCompleted: true });
                setUser(updated);
                updateUser(updated);
                awardPoints(POINTS.assessmentComplete, "Assessment complete!");
            }
        }
    };
    const displayScores = localScores !== null && localScores !== void 0 ? localScores : (assessment ? { skills: assessment.skills } : null);
    if (assessment && !finished && step === 0 && answers.length === 0) {
        return (_jsxs("div", { className: "mx-auto max-w-xl space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Career Assessment" }), _jsxs("p", { className: "text-slate-600 dark:text-slate-400", children: ["You already completed the diagnostic on", " ", new Date(assessment.completedAt).toLocaleDateString(), "."] }), _jsx(SkillRadar, { userSkills: assessment.skills }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Link, { to: "/careers", className: "rounded-lg bg-indigo-600 px-4 py-2 text-white", children: "Explore careers" }), _jsx("button", { type: "button", className: "rounded-lg border px-4 py-2", onClick: () => {
                                setStep(0);
                                setAnswers([]);
                                setFinished(false);
                            }, children: "Retake" })] })] }));
    }
    if (finished && displayScores) {
        return (_jsxs("div", { className: "mx-auto max-w-2xl space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Your skill profile" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: "Saved to this device. Use Diagnostic to compare with careers." }), _jsx(SkillRadar, { userSkills: displayScores.skills }), _jsx(Link, { to: "/diagnostic", className: "inline-block rounded-lg bg-indigo-600 px-4 py-2 text-white", children: "Strength\u2013Gap Diagnostic" })] }));
    }
    return (_jsxs("div", { className: "mx-auto max-w-xl", children: [_jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex justify-between text-sm text-slate-600", children: [_jsxs("span", { children: ["Question ", step + 1, " of ", questions.length] }), _jsxs("span", { children: [Math.round(progress), "%"] })] }), _jsx("div", { className: "mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800", children: _jsx("div", { className: "h-full bg-indigo-600 transition-all duration-300", style: { width: `${progress}%` } }) })] }), _jsxs("div", { className: "rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900", children: [_jsx("h2", { className: "text-lg font-semibold", children: q.text }), _jsx("ul", { className: "mt-6 space-y-2", children: q.options.map((opt) => (_jsx("li", { children: _jsx("button", { type: "button", onClick: () => select(opt), className: "w-full rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-700 dark:hover:bg-indigo-950/40", children: opt.label }) }, opt.label))) })] }, q.id)] }));
}
