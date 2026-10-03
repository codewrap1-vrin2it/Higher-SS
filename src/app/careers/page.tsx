import { useMemo, useState } from "react";
import { Bookmark, Search, X } from "lucide-react";
import { careers } from "@/data/careers";
import { careerMatchPercent } from "@/lib/scoring";
import type { Stream } from "@/lib/types";
import { getUser, setUser } from "@/lib/storage";
import { POINTS } from "@/lib/points";
import { useApp } from "@/context/AppContext";

const streams: (Stream | "All")[] = ["All", "Science", "Commerce", "Humanities", "Vocational"];

export default function CareersPage() {
  const { assessment, user, updateUser, awardPoints } = useApp();
  const [query, setQuery] = useState("");
  const [stream, setStream] = useState<(typeof streams)[number]>("All");
  const [detailId, setDetailId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return careers.filter((c) => {
      const matchStream = stream === "All" || c.stream === stream || c.stream === "Any";
      const matchQuery =
        !query ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.industry.toLowerCase().includes(query.toLowerCase());
      return matchStream && matchQuery;
    });
  }, [query, stream]);

  const detail = detailId ? careers.find((c) => c.id === detailId) : null;

  const toggleBookmark = (id: string) => {
    const u = getUser();
    if (!u) return;
    const has = u.bookmarkedCareerIds.includes(id);
    const bookmarkedCareerIds = has
      ? u.bookmarkedCareerIds.filter((x) => x !== id)
      : [...u.bookmarkedCareerIds, id];
    let next = { ...u, bookmarkedCareerIds };
    if (
      !has &&
      bookmarkedCareerIds.length >= 3 &&
      !u.bookmarkPointsAwarded
    ) {
      next = { ...next, bookmarkPointsAwarded: true };
      setUser(next);
      updateUser(next);
      awardPoints(POINTS.bookmarkThreeCareers, "Bookmarked 3 careers!");
    } else {
      setUser(next);
      updateUser(next);
    }
  };

  const defaultSkills = assessment?.skills;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Career Explorer</h1>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search careers..."
            className="w-full rounded-xl border py-2 pl-10 pr-3 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {streams.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStream(s)}
            className={`rounded-full px-3 py-1 text-sm ${
              stream === s
                ? "bg-indigo-600 text-white"
                : "bg-slate-200 dark:bg-slate-800"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      {!assessment && (
        <p className="text-sm text-amber-700 dark:text-amber-400">
          Take the assessment to see match percentages on each card.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => {
          const match = defaultSkills ? careerMatchPercent(defaultSkills, c) : null;
          const bookmarked = user?.bookmarkedCareerIds.includes(c.id);
          return (
            <article
              key={c.id}
              className="flex flex-col rounded-2xl border bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-bold">{c.title}</h2>
                {match !== null && (
                  <span className="shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950">
                    {match}% match
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {c.stream} · {c.industry}
              </p>
              <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">
                {c.description.slice(0, 100)}…
              </p>
              <p className="mt-2 text-sm font-medium">{c.entrySalary}</p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setDetailId(c.id)}
                  className="flex-1 rounded-lg bg-indigo-600 py-2 text-sm text-white"
                >
                  Details
                </button>
                <button
                  type="button"
                  onClick={() => toggleBookmark(c.id)}
                  className={`rounded-lg border p-2 ${bookmarked ? "border-indigo-500 text-indigo-600" : ""}`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 sm:items-center">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 dark:bg-slate-900">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">{detail.title}</h2>
              <button type="button" onClick={() => setDetailId(null)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{detail.description}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="font-semibold">Growth outlook</dt>
                <dd>{detail.growthOutlook}</dd>
              </div>
              <div>
                <dt className="font-semibold">Entry salary</dt>
                <dd>{detail.entrySalary}</dd>
              </div>
              <div>
                <dt className="font-semibold">Degree pathways</dt>
                <dd>
                  <ul className="list-inside list-disc">
                    {detail.degrees.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Top entrance exams</dt>
                <dd>{detail.entranceExams.join(", ")}</dd>
              </div>
            </dl>
            <h3 className="mt-4 font-semibold">Milestone roadmap</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-400">
              <li>Grades 11–12: Build foundation subjects &amp; one olympiad/competition</li>
              <li>Undergrad: Core degree + internship</li>
              <li>Industry: Portfolio, certification, networking</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
