import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, ClipboardList, Map } from "lucide-react";
import { FloatingBadges } from "@/components/FloatingBadges";
import { LeaderboardWidget } from "@/components/LeaderboardWidget";
import { useApp } from "@/context/AppContext";

export default function HomePage() {
  const { user, assessment, roadmapDone, hydrated } = useApp();
  const milestoneTotal = 9;
  const doneCount = roadmapDone.length;
  const progressPct = Math.round((doneCount / milestoneTotal) * 100);

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 px-6 py-14 text-white shadow-xl">
        <FloatingBadges />
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wide text-indigo-200">
            FutureReady – Life &amp; Career Navigator
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            {hydrated && user
              ? `Welcome back, ${user.name}! ⭐ ${user.points} pts`
              : "Plan your future with clarity"}
          </h1>
          <p className="mt-4 text-indigo-100">
            RIASEC-powered diagnostics, career matches, and a 3-stage roadmap built
            for Grades 11–12 — no login required.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="rounded-xl bg-white/15 px-4 py-2 backdrop-blur">
              {assessment ? "Assessment ✓" : "10-question diagnostic"}
            </div>
            <div className="rounded-xl bg-white/15 px-4 py-2 backdrop-blur">
              13+ career profiles
            </div>
            <div className="rounded-xl bg-white/15 px-4 py-2 backdrop-blur">
              Roadmap {progressPct}% complete
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          to="/assessment"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900"
        >
          <ClipboardList className="h-8 w-8 text-indigo-600" />
          <h2 className="mt-3 font-bold">Take Diagnostic Test</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            10 questions · RIASEC + skills · +150 pts on completion
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
            Start <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </Link>
        <Link
          to="/careers"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900"
        >
          <Briefcase className="h-8 w-8 text-violet-600" />
          <h2 className="mt-3 font-bold">Explore Careers</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Match scores, salaries, degrees &amp; exams
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
            Browse <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </Link>
        <Link
          to="/roadmap"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900"
        >
          <Map className="h-8 w-8 text-indigo-500" />
          <h2 className="mt-3 font-bold">View My Roadmap</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            3-stage milestones with checklist (+30 pts each)
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
            Open roadmap <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </Link>
      </section>

      <LeaderboardWidget compact />
    </div>
  );
}
