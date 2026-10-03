import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import { Timer, Zap } from "lucide-react";
import { skillRushRounds } from "@/data/skillRush";
import { POINTS } from "@/lib/points";
import { useApp } from "@/context/AppContext";
const GAME_SECONDS = 60;
const TARGET_MATCHES = 5;
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
export default function SkillRushPage() {
    const { awardPoints } = useApp();
    const [playing, setPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
    const [roundIndex, setRoundIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [finished, setFinished] = useState(false);
    const [order, setOrder] = useState([]);
    const [rounds, setRounds] = useState(() => shuffle(skillRushRounds).slice(0, 8));
    const current = rounds[roundIndex % rounds.length];
    useEffect(() => {
        if (!playing || finished)
            return;
        if (timeLeft <= 0) {
            setFinished(true);
            setPlaying(false);
            return;
        }
        const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [playing, timeLeft, finished]);
    const start = () => {
        setRounds(shuffle(skillRushRounds).slice(0, 8));
        setPlaying(true);
        setTimeLeft(GAME_SECONDS);
        setRoundIndex(0);
        setCorrectCount(0);
        setFinished(false);
        setOrder(shuffle([0, 1, 2, 3]));
    };
    const pickSkill = useCallback((skill) => {
        if (!playing || !current || finished)
            return;
        if (skill === current.correctSkill) {
            const nextCorrect = correctCount + 1;
            setCorrectCount(nextCorrect);
            awardPoints(POINTS.skillRushPerMatch, "Career Matcher correct!");
            if (nextCorrect >= TARGET_MATCHES) {
                setFinished(true);
                setPlaying(false);
                return;
            }
            setRoundIndex((i) => i + 1);
            setOrder(shuffle([0, 1, 2, 3]));
        }
        else {
            setTimeLeft((t) => Math.max(0, t - 3));
        }
    }, [playing, current, finished, correctCount, awardPoints]);
    const skillsShown = current
        ? order.map((i) => current.skills[i]).filter(Boolean)
        : [];
    return (_jsxs("div", { className: "mx-auto max-w-xl space-y-6", children: [_jsxs("div", { children: [_jsxs("h1", { className: "flex items-center gap-2 text-2xl font-bold", children: [_jsx(Zap, { className: "h-7 w-7 text-amber-500" }), "Skill Rush \u2014 Career Matcher"] }), _jsxs("p", { className: "text-slate-600 dark:text-slate-400", children: ["60 seconds \u00B7 Match the key skill to each career \u00B7 +", POINTS.skillRushPerMatch, " pts per correct answer \u00B7 Win at ", TARGET_MATCHES, " matches."] })] }), !playing && !finished && (_jsx("button", { type: "button", onClick: start, className: "w-full rounded-xl bg-indigo-600 py-4 font-bold text-white", children: "Start Game" })), (playing || finished) && current && (_jsxs("div", { className: "rounded-2xl border bg-white p-6 dark:border-slate-800 dark:bg-slate-900", children: [_jsxs("div", { className: "flex justify-between text-sm font-medium", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Timer, { className: "h-4 w-4" }), " ", timeLeft, "s"] }), _jsxs("span", { children: ["Correct: ", correctCount, " / ", TARGET_MATCHES] })] }), _jsxs("p", { className: "mt-6 text-center text-lg font-semibold", children: ["Which skill fits ", _jsx("span", { className: "text-indigo-600", children: current.careerTitle }), "?"] }), _jsx("div", { className: "mt-6 grid grid-cols-2 gap-3", children: skillsShown.map((skill) => (_jsx("button", { type: "button", disabled: !playing, onClick: () => pickSkill(skill), className: "rounded-xl border py-4 text-sm font-medium transition hover:border-indigo-500 hover:bg-indigo-50 disabled:opacity-50 dark:hover:bg-indigo-950", children: skill }, skill))) })] })), finished && (_jsxs("div", { className: "rounded-xl bg-indigo-50 p-4 text-center dark:bg-indigo-950/40", children: [_jsx("p", { className: "font-bold", children: "Time's up or target reached!" }), _jsxs("p", { className: "text-sm", children: ["You scored ", correctCount, " correct matches."] }), _jsx("button", { type: "button", onClick: start, className: "mt-3 text-indigo-600 font-semibold", children: "Play again" })] }))] }));
}
