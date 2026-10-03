"use client";

import { FLOATING_BADGES } from "@/lib/constants";

export function FloatingBadges() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {FLOATING_BADGES.map((badge, i) => (
        <div
          key={badge.label}
          className="pointer-events-auto absolute animate-float"
          style={{
            top: `${12 + (i % 3) * 22}%`,
            left: `${8 + i * 17}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          <div className="group relative cursor-default rounded-2xl border border-white/40 bg-white/80 px-3 py-2 shadow-md backdrop-blur transition hover:rotate-3 dark:border-slate-600 dark:bg-slate-800/80">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {badge.emoji} <em className="not-italic text-indigo-600 dark:text-indigo-300">{badge.label}</em>
            </span>
            <div className="absolute bottom-full left-1/2 mb-2 hidden w-48 -translate-x-1/2 rounded-lg bg-slate-900 px-2 py-1 text-xs text-white group-hover:block">
              {badge.tip}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
