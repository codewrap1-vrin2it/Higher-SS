export const STORAGE_KEYS = {
    user: "futureready_user",
    assessment: "futureready_assessment",
    roadmap: "futureready_roadmap_done",
    leaderboard: "futureready_leaderboard",
    theme: "futureready_theme",
};
export function safeParse(raw, fallback) {
    if (!raw)
        return fallback;
    try {
        return JSON.parse(raw);
    }
    catch (_a) {
        return fallback;
    }
}
export function getUser() {
    if (typeof window === "undefined")
        return null;
    return safeParse(localStorage.getItem(STORAGE_KEYS.user), null);
}
export function setUser(user) {
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    syncUserToLeaderboard(user);
}
export function getAssessment() {
    if (typeof window === "undefined")
        return null;
    return safeParse(localStorage.getItem(STORAGE_KEYS.assessment), null);
}
export function setAssessment(scores) {
    localStorage.setItem(STORAGE_KEYS.assessment, JSON.stringify(scores));
}
export function getRoadmapDone() {
    if (typeof window === "undefined")
        return [];
    return safeParse(localStorage.getItem(STORAGE_KEYS.roadmap), []);
}
export function setRoadmapDone(ids) {
    localStorage.setItem(STORAGE_KEYS.roadmap, JSON.stringify(ids));
}
export const SEED_LEADERBOARD = [
    { id: "seed-1", name: "Aarav S.", points: 820, avatar: "🚀" },
    { id: "seed-2", name: "Priya K.", points: 740, avatar: "📊" },
    { id: "seed-3", name: "Rohan M.", points: 690, avatar: "🎨" },
    { id: "seed-4", name: "Sneha R.", points: 650, avatar: "🧬" },
    { id: "seed-5", name: "Vikram T.", points: 610, avatar: "💼" },
];
export function getLeaderboard() {
    if (typeof window === "undefined")
        return SEED_LEADERBOARD;
    const stored = safeParse(localStorage.getItem(STORAGE_KEYS.leaderboard), null);
    if (!stored) {
        localStorage.setItem(STORAGE_KEYS.leaderboard, JSON.stringify(SEED_LEADERBOARD));
        return [...SEED_LEADERBOARD];
    }
    return stored;
}
export function setLeaderboard(entries) {
    localStorage.setItem(STORAGE_KEYS.leaderboard, JSON.stringify(entries));
}
export function syncUserToLeaderboard(user) {
    const board = getLeaderboard().filter((e) => !e.isUser);
    board.push({
        id: user.id,
        name: user.name,
        points: user.points,
        avatar: user.avatar,
        isUser: true,
    });
    board.sort((a, b) => b.points - a.points);
    setLeaderboard(board);
}
export function addPoints(amount) {
    const user = getUser();
    if (!user)
        return null;
    const updated = Object.assign(Object.assign({}, user), { points: user.points + amount });
    setUser(updated);
    return updated;
}
export function clearAllData() {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    localStorage.setItem(STORAGE_KEYS.leaderboard, JSON.stringify(SEED_LEADERBOARD));
}
