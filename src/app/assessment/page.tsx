import { useState } from "react";
import { Link } from "react-router-dom";
import { questions } from "@/data/questions";
import type { QuestionOption } from "@/lib/types";
import { aggregateAnswers } from "@/lib/scoring";
import { setAssessment, getUser, setUser } from "@/lib/storage";
import { POINTS } from "@/lib/points";
import { useApp } from "@/context/AppContext";
import { SkillRadar } from "@/components/SkillRadar";

export default function AssessmentPage() {
  const { assessment, refreshAssessment, awardPoints, user, updateUser } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuestionOption[]>([]);
  const [finished, setFinished] = useState(false);
  const [localScores, setLocalScores] = useState<ReturnType<typeof aggregateAnswers> | null>(null);

  const q = questions[step];
  const progress = ((step + (finished ? 1 : 0)) / questions.length) * 100;

  const select = (opt: QuestionOption) => {
    const next = [...answers, opt];
    setAnswers(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const scores = aggregateAnswers(next);
      const payload = {
        ...scores,
        completedAt: new Date().toISOString(),
      };
      setAssessment(payload);
      refreshAssessment();
      setLocalScores(scores);
      setFinished(true);
      const u = getUser();
      if (u && !u.assessmentCompleted) {
        const updated = { ...u, assessmentCompleted: true };
        setUser(updated);
        updateUser(updated);
        awardPoints(POINTS.assessmentComplete, "Assessment complete!");
      }
    }
  };

  const displayScores = localScores ?? (assessment ? { skills: assessment.skills } : null);

  if (assessment && !finished && step === 0 && answers.length === 0) {
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <h1 className="text-2xl font-bold">Career Assessment</h1>
        <p className="text-slate-600 dark:text-slate-400">
          You already completed the diagnostic on{" "}
          {new Date(assessment.completedAt).toLocaleDateString()}.
        </p>
        <SkillRadar userSkills={assessment.skills} />
        <div className="flex gap-3">
          <Link to="/careers" className="rounded-lg bg-indigo-600 px-4 py-2 text-white">
            Explore careers
          </Link>
          <button
            type="button"
            className="rounded-lg border px-4 py-2"
            onClick={() => {
              setStep(0);
              setAnswers([]);
              setFinished(false);
            }}
          >
            Retake
          </button>
        </div>
      </div>
    );
  }

  if (finished && displayScores) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">Your skill profile</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Saved to this device. Use Diagnostic to compare with careers.
        </p>
        <SkillRadar userSkills={displayScores.skills} />
        <Link to="/diagnostic" className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-white">
          Strength–Gap Diagnostic
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-600">
          <span>
            Question {step + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div key={q.id} className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold">{q.text}</h2>
        <ul className="mt-6 space-y-2">
          {q.options.map((opt) => (
            <li key={opt.label}>
              <button
                type="button"
                onClick={() => select(opt)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-700 dark:hover:bg-indigo-950/40"
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
