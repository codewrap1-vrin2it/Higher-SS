"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AssessmentScores, UserProfile } from "@/lib/types";
import {
  addPoints,
  getAssessment,
  getLeaderboard,
  getRoadmapDone,
  getUser,
  setRoadmapDone,
  setUser,
  syncUserToLeaderboard,
} from "@/lib/storage";
import { celebratePoints } from "@/lib/confetti";

type Toast = { id: number; message: string };

type AppContextValue = {
  user: UserProfile | null;
  assessment: AssessmentScores | null;
  roadmapDone: string[];
  leaderboard: ReturnType<typeof getLeaderboard>;
  hydrated: boolean;
  toasts: Toast[];
  refreshUser: () => void;
  refreshAssessment: () => void;
  refreshRoadmap: () => void;
  refreshLeaderboard: () => void;
  updateUser: (user: UserProfile) => void;
  awardPoints: (amount: number, message: string) => void;
  toggleRoadmapItem: (id: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [assessment, setAssessmentState] = useState<AssessmentScores | null>(null);
  const [roadmapDone, setRoadmapDoneState] = useState<string[]>([]);
  const [leaderboard, setLeaderboardState] = useState(getLeaderboard());
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    setUserState(getUser());
    setAssessmentState(getAssessment());
    setRoadmapDoneState(getRoadmapDone());
    setLeaderboardState(getLeaderboard());
    setHydrated(true);
  }, []);

  const refreshUser = useCallback(() => setUserState(getUser()), []);
  const refreshAssessment = useCallback(() => setAssessmentState(getAssessment()), []);
  const refreshRoadmap = useCallback(() => setRoadmapDoneState(getRoadmapDone()), []);
  const refreshLeaderboard = useCallback(() => setLeaderboardState(getLeaderboard()), []);

  const updateUser = useCallback(
    (u: UserProfile) => {
      setUser(u);
      setUserState(u);
      syncUserToLeaderboard(u);
      refreshLeaderboard();
    },
    [refreshLeaderboard]
  );

  const pushToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);

  const awardPoints = useCallback(
    (amount: number, message: string) => {
      const updated = addPoints(amount);
      if (updated) {
        setUserState(updated);
        setLeaderboardState(getLeaderboard());
        celebratePoints();
        pushToast(`${message} +${amount} pts`);
      }
    },
    [pushToast]
  );

  const toggleRoadmapItem = useCallback(
    (id: string) => {
      const current = getRoadmapDone();
      const isDone = current.includes(id);
      const next = isDone ? current.filter((x) => x !== id) : [...current, id];
      setRoadmapDone(next);
      setRoadmapDoneState(next);
      if (!isDone) {
        awardPoints(30, "Milestone completed!");
      }
    },
    [awardPoints]
  );

  const value = useMemo(
    () => ({
      user,
      assessment,
      roadmapDone,
      leaderboard,
      hydrated,
      toasts,
      refreshUser,
      refreshAssessment,
      refreshRoadmap,
      refreshLeaderboard,
      updateUser,
      awardPoints,
      toggleRoadmapItem,
    }),
    [
      user,
      assessment,
      roadmapDone,
      leaderboard,
      hydrated,
      toasts,
      refreshUser,
      refreshAssessment,
      refreshRoadmap,
      refreshLeaderboard,
      updateUser,
      awardPoints,
      toggleRoadmapItem,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
