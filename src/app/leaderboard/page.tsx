import { clearAllData } from "@/lib/storage";
import { LeaderboardWidget } from "@/components/LeaderboardWidget";

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">Campus Leaderboard</h1>
      <p className="text-slate-600 dark:text-slate-400">
        Rankings are stored locally on this device. Your points sync automatically when
        you earn rewards.
      </p>
      <LeaderboardWidget />
      <button
        type="button"
        onClick={() => {
          if (confirm("Reset all data and re-seed leaderboard?")) {
            clearAllData();
            window.location.reload();
          }
        }}
        className="text-sm text-red-600 underline"
      >
        Reset / Clear Data (developer toggle)
      </button>
    </div>
  );
}
