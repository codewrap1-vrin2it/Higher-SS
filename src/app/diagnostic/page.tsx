import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { careers } from "@/data/careers";
import { useApp } from "@/context/AppContext";
import { SkillRadar } from "@/components/SkillRadar";
import { SkillGapCard } from "@/components/SkillGapCard";

export default function DiagnosticPage() {
  const { assessment } = useApp();
  const [careerId, setCareerId] = useState(careers[0]?.id ?? "");

  const career = useMemo(
    () => careers.find((c) => c.id === careerId) ?? careers[0],
    [careerId]
  );

  if (!assessment) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30">
        <h1 className="text-xl font-bold">Strength–Gap Diagnostic</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Complete the career assessment first to compare your skills against career benchmarks.
        </p>
        <Link to="/assessment" className="mt-4 inline-block text-indigo-600 font-semibold">
          Take assessment →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Strength–Gap Diagnostic</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Radar view: your profile vs selected career benchmark (1–5 scale).
        </p>
      </div>
      <label className="block max-w-md text-sm font-medium">
        Select career
        <select
          value={careerId}
          onChange={(e) => setCareerId(e.target.value)}
          className="mt-1 w-full rounded-lg border px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
        >
          {careers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </label>
      <div className="rounded-2xl border bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <SkillRadar userSkills={assessment.skills} benchmark={career.skillBenchmark} />
      </div>
      <SkillGapCard
        userSkills={assessment.skills}
        benchmark={career.skillBenchmark}
        careerTitle={career.title}
      />
    </div>
  );
}
