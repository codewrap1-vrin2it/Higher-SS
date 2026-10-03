import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { resources } from "@/data/resources";
import type { SkillKey } from "@/lib/types";
import { SKILL_KEYS } from "@/lib/constants";

export default function ResourcesPage() {
  const [skill, setSkill] = useState<SkillKey | "All">("All");
  const [difficulty, setDifficulty] = useState<string>("All");

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const skillOk = skill === "All" || r.skillTags.includes(skill);
      const diffOk = difficulty === "All" || r.difficulty === difficulty;
      return skillOk && diffOk;
    });
  }, [skill, difficulty]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Free Resources Directory</h1>
      <div className="flex flex-wrap gap-2">
        <select
          value={skill}
          onChange={(e) => setSkill(e.target.value as SkillKey | "All")}
          className="rounded-lg border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="All">All skills</option>
          {SKILL_KEYS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
        >
          {["All", "Beginner", "Intermediate", "Advanced"].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((r) => (
          <article
            key={r.id}
            className="rounded-2xl border bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-bold">{r.title}</h2>
              <span className="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-xs dark:bg-slate-800">
                {r.platform}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{r.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">
                {r.difficulty}
              </span>
              {r.skillTags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-violet-100 px-2 py-0.5 text-xs dark:bg-violet-950"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600"
            >
              Open resource <ExternalLink className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
