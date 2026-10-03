import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Bookmark, Search, X } from "lucide-react";
import { careers } from "@/data/careers";
import { careerMatchPercent } from "@/lib/scoring";
import { getUser, setUser } from "@/lib/storage";
import { POINTS } from "@/lib/points";
import { useApp } from "@/context/AppContext";
const streams = ["All", "Science", "Commerce", "Humanities", "Vocational"];
export default function CareersPage() {
    const { assessment, user, updateUser, awardPoints } = useApp();
    const [query, setQuery] = useState("");
    const [stream, setStream] = useState("All");
    const [detailId, setDetailId] = useState(null);
    const filtered = useMemo(() => {
        return careers.filter((c) => {
            const matchStream = stream === "All" || c.stream === stream || c.stream === "Any";
            const matchQuery = !query ||
                c.title.toLowerCase().includes(query.toLowerCase()) ||
                c.industry.toLowerCase().includes(query.toLowerCase());
            return matchStream && matchQuery;
        });
    }, [query, stream]);
    const detail = detailId ? careers.find((c) => c.id === detailId) : null;
    const toggleBookmark = (id) => {
        const u = getUser();
        if (!u)
            return;
        const has = u.bookmarkedCareerIds.includes(id);
        const bookmarkedCareerIds = has
            ? u.bookmarkedCareerIds.filter((x) => x !== id)
            : [...u.bookmarkedCareerIds, id];
        let next = Object.assign(Object.assign({}, u), { bookmarkedCareerIds });
        if (!has &&
            bookmarkedCareerIds.length >= 3 &&
            !u.bookmarkPointsAwarded) {
            next = Object.assign(Object.assign({}, next), { bookmarkPointsAwarded: true });
            setUser(next);
            updateUser(next);
            awardPoints(POINTS.bookmarkThreeCareers, "Bookmarked 3 careers!");
        }
        else {
            setUser(next);
            updateUser(next);
        }
    };
    const defaultSkills = assessment === null || assessment === void 0 ? void 0 : assessment.skills;
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Career Explorer" }), _jsx("div", { className: "flex flex-col gap-3 sm:flex-row", children: _jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }), _jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search careers...", className: "w-full rounded-xl border py-2 pl-10 pr-3 dark:border-slate-700 dark:bg-slate-800" })] }) }), _jsx("div", { className: "flex flex-wrap gap-2", children: streams.map((s) => (_jsx("button", { type: "button", onClick: () => setStream(s), className: `rounded-full px-3 py-1 text-sm ${stream === s
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-200 dark:bg-slate-800"}`, children: s }, s))) }), !assessment && (_jsx("p", { className: "text-sm text-amber-700 dark:text-amber-400", children: "Take the assessment to see match percentages on each card." })), _jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((c) => {
                    const match = defaultSkills ? careerMatchPercent(defaultSkills, c) : null;
                    const bookmarked = user === null || user === void 0 ? void 0 : user.bookmarkedCareerIds.includes(c.id);
                    return (_jsxs("article", { className: "flex flex-col rounded-2xl border bg-white p-5 dark:border-slate-800 dark:bg-slate-900", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsx("h2", { className: "font-bold", children: c.title }), match !== null && (_jsxs("span", { className: "shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950", children: [match, "% match"] }))] }), _jsxs("p", { className: "mt-1 text-xs text-slate-500", children: [c.stream, " \u00B7 ", c.industry] }), _jsxs("p", { className: "mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400", children: [c.description.slice(0, 100), "\u2026"] }), _jsx("p", { className: "mt-2 text-sm font-medium", children: c.entrySalary }), _jsxs("div", { className: "mt-4 flex gap-2", children: [_jsx("button", { type: "button", onClick: () => setDetailId(c.id), className: "flex-1 rounded-lg bg-indigo-600 py-2 text-sm text-white", children: "Details" }), _jsx("button", { type: "button", onClick: () => toggleBookmark(c.id), className: `rounded-lg border p-2 ${bookmarked ? "border-indigo-500 text-indigo-600" : ""}`, "aria-label": "Bookmark", children: _jsx(Bookmark, { className: `h-4 w-4 ${bookmarked ? "fill-current" : ""}` }) })] })] }, c.id));
                }) }), detail && (_jsx("div", { className: "fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 sm:items-center", children: _jsxs("div", { className: "max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 dark:bg-slate-900", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("h2", { className: "text-xl font-bold", children: detail.title }), _jsx("button", { type: "button", onClick: () => setDetailId(null), "aria-label": "Close", children: _jsx(X, { className: "h-5 w-5" }) })] }), _jsx("p", { className: "mt-2 text-sm text-slate-600 dark:text-slate-400", children: detail.description }), _jsxs("dl", { className: "mt-4 space-y-2 text-sm", children: [_jsxs("div", { children: [_jsx("dt", { className: "font-semibold", children: "Growth outlook" }), _jsx("dd", { children: detail.growthOutlook })] }), _jsxs("div", { children: [_jsx("dt", { className: "font-semibold", children: "Entry salary" }), _jsx("dd", { children: detail.entrySalary })] }), _jsxs("div", { children: [_jsx("dt", { className: "font-semibold", children: "Degree pathways" }), _jsx("dd", { children: _jsx("ul", { className: "list-inside list-disc", children: detail.degrees.map((d) => (_jsx("li", { children: d }, d))) }) })] }), _jsxs("div", { children: [_jsx("dt", { className: "font-semibold", children: "Top entrance exams" }), _jsx("dd", { children: detail.entranceExams.join(", ") })] })] }), _jsx("h3", { className: "mt-4 font-semibold", children: "Milestone roadmap" }), _jsxs("ol", { className: "mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-400", children: [_jsx("li", { children: "Grades 11\u201312: Build foundation subjects & one olympiad/competition" }), _jsx("li", { children: "Undergrad: Core degree + internship" }), _jsx("li", { children: "Industry: Portfolio, certification, networking" })] })] }) }))] }));
}
