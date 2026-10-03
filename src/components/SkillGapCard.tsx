"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { skillGaps } from "@/lib/scoring";
import type { SkillProfile } from "@/lib/types";

export function SkillGapCard({
  userSkills,
  benchmark,
  careerTitle,
}: {
  userSkills: SkillProfile;
  benchmark: SkillProfile;
  careerTitle: string;
}) {
  const gaps = skillGaps(userSkills, benchmark);
  const strengths = gaps.filter((g) => g.delta >= 0.3);
  const deficits = gaps.filter((g) => g.delta <= -0.3);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="font-bold">Skill Gap — {careerTitle}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
            <TrendingUp className="h-4 w-4" /> Strengths
          </p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
            {strengths.length ? (
              strengths.map((g) => (
                <li key={g.skill}>
                  +{g.delta} above benchmark in {g.skill}
                </li>
              ))
            ) : (
              <li>Complete assessment for clearer strengths.</li>
            )}
          </ul>
        </div>
        <div>
          <p className="flex items-center gap-1 text-sm font-semibold text-amber-600">
            <TrendingDown className="h-4 w-4" /> Growth areas
          </p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
            {deficits.length ? (
              deficits.map((g) => (
                <li key={g.skill}>
                  {g.delta} below benchmark in {g.skill}
                </li>
              ))
            ) : (
              <li>You&apos;re close to benchmark across skills!</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
