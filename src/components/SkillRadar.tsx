"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { SkillProfile } from "@/lib/types";
import { SKILL_KEYS } from "@/lib/constants";

export function SkillRadar({
  userSkills,
  benchmark,
}: {
  userSkills: SkillProfile;
  benchmark?: SkillProfile;
}) {
  const data = SKILL_KEYS.map((skill) => ({
    skill,
    You: userSkills[skill],
    Benchmark: benchmark ? benchmark[skill] : userSkills[skill],
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 5]} />
          <Radar
            name="You"
            dataKey="You"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.4}
          />
          {benchmark && (
            <Radar
              name="Career benchmark"
              dataKey="Benchmark"
              stroke="#a78bfa"
              fill="#a78bfa"
              fillOpacity={0.2}
            />
          )}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
