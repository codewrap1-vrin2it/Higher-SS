"use client";

import { useState } from "react";
import { Settings, X } from "lucide-react";
import { clearAllData, setUser } from "@/lib/storage";
import { useApp } from "@/context/AppContext";

export function ProfileModal() {
  const { user, updateUser } = useApp();
  const [open, setOpen] = useState(false);
  const [editName, setEditName] = useState("");

  if (!user) return null;

  const openModal = () => {
    setEditName(user.name);
    setOpen(true);
  };

  const saveName = () => {
    if (!editName.trim()) return;
    const u = { ...user, name: editName.trim() };
    setUser(u);
    updateUser(u);
    setOpen(false);
  };

  const resetData = () => {
    if (!confirm("Clear all FutureReady data? This cannot be undone.")) return;
    clearAllData();
    window.location.reload();
  };

  const switchProfile = () => {
    localStorage.removeItem("futureready_user");
    window.location.reload();
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <span className="text-lg">{user.avatar}</span>
        <span className="hidden font-medium sm:inline">{user.name}</span>
        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
          ⭐ {user.points} pts
        </span>
        <Settings className="h-4 w-4 text-slate-500" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Profile & Settings</h3>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <label className="mt-4 block text-sm">
              Edit name
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="mt-1 w-full rounded-lg border px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
              />
            </label>
            <button
              type="button"
              onClick={saveName}
              className="mt-3 w-full rounded-lg bg-indigo-600 py-2 text-white"
            >
              Save Name
            </button>
            <button
              type="button"
              onClick={switchProfile}
              className="mt-2 w-full rounded-lg border py-2 dark:border-slate-600"
            >
              Switch Profile (re-onboard)
            </button>
            <button
              type="button"
              onClick={resetData}
              className="mt-4 w-full rounded-lg border border-red-300 py-2 text-sm text-red-600"
            >
              Reset / Clear Data (dev)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
