"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, } from "react";
import { addPoints, getAssessment, getLeaderboard, getRoadmapDone, getUser, setRoadmapDone, setUser, syncUserToLeaderboard, } from "@/lib/storage";
import { celebratePoints } from "@/lib/confetti";
const AppContext = createContext(null);
export function AppProvider({ children }) {
    const [user, setUserState] = useState(null);
    const [assessment, setAssessmentState] = useState(null);
    const [roadmapDone, setRoadmapDoneState] = useState([]);
    const [leaderboard, setLeaderboardState] = useState(getLeaderboard());
    const [hydrated, setHydrated] = useState(false);
    const [toasts, setToasts] = useState([]);
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
    const updateUser = useCallback((u) => {
        setUser(u);
        setUserState(u);
        syncUserToLeaderboard(u);
        refreshLeaderboard();
    }, [refreshLeaderboard]);
    const pushToast = useCallback((message) => {
        const id = Date.now();
        setToasts((t) => [...t, { id, message }]);
        setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
    }, []);
    const awardPoints = useCallback((amount, message) => {
        const updated = addPoints(amount);
        if (updated) {
            setUserState(updated);
            setLeaderboardState(getLeaderboard());
            celebratePoints();
            pushToast(`${message} +${amount} pts`);
        }
    }, [pushToast]);
    const toggleRoadmapItem = useCallback((id) => {
        const current = getRoadmapDone();
        const isDone = current.includes(id);
        const next = isDone ? current.filter((x) => x !== id) : [...current, id];
        setRoadmapDone(next);
        setRoadmapDoneState(next);
        if (!isDone) {
            awardPoints(30, "Milestone completed!");
        }
    }, [awardPoints]);
    const value = useMemo(() => ({
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
    }), [
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
    ]);
    return _jsx(AppContext.Provider, { value: value, children: children });
}
export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error("useApp must be used within AppProvider");
    return ctx;
}
