"use client";

import { Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function ToastStack() {
  const { toasts } = useApp();
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-3 shadow-lg dark:border-indigo-800 dark:bg-slate-900"
        >
          <Sparkles className="h-5 w-5 text-indigo-500" />
          <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
            {t.message}
          </span>
        </div>
      ))}
    </div>
  );
}
