import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clearAllData } from "@/lib/storage";
import { LeaderboardWidget } from "@/components/LeaderboardWidget";
export default function LeaderboardPage() {
    return (_jsxs("div", { className: "mx-auto max-w-lg space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Campus Leaderboard" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: "Rankings are stored locally on this device. Your points sync automatically when you earn rewards." }), _jsx(LeaderboardWidget, {}), _jsx("button", { type: "button", onClick: () => {
                    if (confirm("Reset all data and re-seed leaderboard?")) {
                        clearAllData();
                        window.location.reload();
                    }
                }, className: "text-sm text-red-600 underline", children: "Reset / Clear Data (developer toggle)" })] }));
}
