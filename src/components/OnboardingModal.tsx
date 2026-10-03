"use client";

import { useState } from "react";
import { AVATARS } from "@/lib/constants";
import { POINTS } from "@/lib/points";
import type { Grade, Stream, UserProfile } from "@/lib/types";
import { useApp } from "@/context/AppContext";

const streams: Stream[] = ["Science", "Commerce", "Humanities", "Vocational"];
const grades: Grade[] = ["11", "12"];

export function OnboardingModal() {
  const { user, hydrated, updateUser } = useApp();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<Grade>("11");
  const [stream, setStream] = useState<Stream>("Science");
  const [avatar, setAvatar] = useState(AVATARS[0]);

  if (!hydrated || user) return null;

  const submit = () => {
    if (!name.trim()) return;
    const profile: UserProfile = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      grade,
      stream,
      avatar,
      points: POINTS.onboardingBonus,
      onboardedAt: new Date().toISOString(),
      bookmarkedCareerIds: [],
      assessmentCompleted: false,
      bookmarkPointsAwarded: false,
    };
    updateUser(profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-indigo-200 bg-white p-6 shadow-2xl dark:border-indigo-900 dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Welcome to FutureReady 🎓
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Your zero-login career navigator. Tell us a bit about you to personalize
          your journey (+{POINTS.onboardingBonus} starter pts).
        </p>
        <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">
          What&apos;s your name?
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
            placeholder="Your first name"
          />
        </label>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Grade
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value as Grade)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
            >
              {grades.map((g) => (
                <option key={g} value={g}>
                  Grade {g}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Stream
            <select
              value={stream}
              onChange={(e) => setStream(e.target.value as Stream)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
            >
              {streams.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
          Pick your avatar
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {AVATARS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAvatar(a)}
              className={`rounded-xl border-2 px-4 py-2 text-2xl ${
                avatar === a
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                  : "border-transparent bg-slate-100 dark:bg-slate-800"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={submit}
          disabled={!name.trim()}
          className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          Let&apos;s Get Started
        </button>
      </div>
    </div>
  );
}
