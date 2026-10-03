import { CheckCircle2, Circle } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { roadmapMilestones, STAGE_LABELS } from "@/data/roadmap";
import { useApp } from "@/context/AppContext";

export default function RoadmapPage() {
  const { roadmapDone, toggleRoadmapItem } = useApp();

  const byStage = ([1, 2, 3] as const).map((stage) => ({
    stage,
    label: STAGE_LABELS[stage],
    items: roadmapMilestones.filter((m) => m.stage === stage),
  }));

  const chartData = byStage.map(({ stage, label, items }) => ({
    name: `Stage ${stage}`,
    label,
    done: items.filter((i) => roadmapDone.includes(i.id)).length,
    total: items.length,
  }));

  const totalDone = roadmapDone.length;
  const total = roadmapMilestones.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Personalized Roadmap</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Mark milestones done — progress saves automatically (+30 pts each).
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold">Progress by stage</h2>
        <div className="mt-4 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip
                formatter={(value, _name, props) => [
                  `${value} / ${props.payload.total}`,
                  "Completed",
                ]}
              />
              <Bar dataKey="done" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-sm text-slate-600">
          Overall: {totalDone} / {total} milestones ({Math.round((totalDone / total) * 100)}%)
        </p>
      </div>

      <div className="relative space-y-12 border-l-2 border-indigo-200 pl-6 dark:border-indigo-900">
        {byStage.map(({ stage, label, items }) => (
          <section key={stage} className="relative">
            <span className="absolute -left-[1.65rem] flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
              {stage}
            </span>
            <h2 className="text-lg font-bold">{label}</h2>
            <ul className="mt-4 space-y-3">
              {items.map((m) => {
                const done = roadmapDone.includes(m.id);
                return (
                  <li key={m.id}>
                    <button
                      type="button"
                      onClick={() => toggleRoadmapItem(m.id)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                        done
                          ? "border-emerald-300 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
                          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      ) : (
                        <Circle className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                      )}
                      <span>
                        <span className="font-medium">{m.title}</span>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {m.description}
                        </p>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
