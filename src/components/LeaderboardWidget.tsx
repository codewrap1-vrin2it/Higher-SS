import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function LeaderboardWidget({ compact }: { compact?: boolean }) {
  const { leaderboard, user } = useApp();
  const sorted = [...leaderboard].sort((a, b) => b.points - a.points);
  const userRank =
    user && sorted.findIndex((e) => e.isUser) >= 0
      ? sorted.findIndex((e) => e.isUser) + 1
      : null;
  const slice = compact ? sorted.slice(0, 5) : sorted;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-bold">
          <Trophy className="h-5 w-5 text-amber-500" />
          Leaderboard
        </h3>
        {compact && (
          <Link to="/leaderboard" className="text-sm text-indigo-600">
            View all
          </Link>
        )}
      </div>
      {userRank && (
        <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400">
          You — Rank #{userRank}
        </p>
      )}
      <ul className="mt-4 space-y-2">
        {slice.map((entry, idx) => (
          <li
            key={entry.id}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
              entry.isUser
                ? "bg-indigo-50 font-semibold ring-2 ring-indigo-400 dark:bg-indigo-950/50"
                : "bg-slate-50 dark:bg-slate-800/50"
            }`}
          >
            <span>
              #{idx + 1} {entry.avatar} {entry.name}
              {entry.isUser && (
                <span className="ml-2 rounded bg-indigo-600 px-1.5 py-0.5 text-xs text-white">
                  You
                </span>
              )}
            </span>
            <span>{entry.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
