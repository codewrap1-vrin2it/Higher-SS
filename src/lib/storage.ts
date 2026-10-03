import type {
  AssessmentScores,
  LeaderboardEntry,
  UserProfile,
} from "./types";

export const STORAGE_KEYS = {
  user: "futureready_user",
  assessment: "futureready_assessment",
  roadmap: "futureready_roadmap_done",
  leaderboard: "futureready_leaderboard",
  theme: "futureready_theme",
} as const;

export function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  return safeParse<UserProfile | null>(
    localStorage.getItem(STORAGE_KEYS.user),
    null
  );
}

export function setUser(user: UserProfile): void {
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  syncUserToLeaderboard(user);
}

export function getAssessment(): AssessmentScores | null {
  if (typeof window === "undefined") return null;
  return safeParse<AssessmentScores | null>(
    localStorage.getItem(STORAGE_KEYS.assessment),
    null
  );
}

export function setAssessment(scores: AssessmentScores): void {
  localStorage.setItem(STORAGE_KEYS.assessment, JSON.stringify(scores));
}

export function getRoadmapDone(): string[] {
  if (typeof window === "undefined") return [];
  return safeParse<string[]>(
    localStorage.getItem(STORAGE_KEYS.roadmap),
    []
  );
}

export function setRoadmapDone(ids: string[]): void {
  localStorage.setItem(STORAGE_KEYS.roadmap, JSON.stringify(ids));
}

export const SEED_LEADERBOARD: LeaderboardEntry[] = [
  { id: "seed-1", name: "Aarav S.", points: 820, avatar: "🚀" },
  { id: "seed-2", name: "Priya K.", points: 740, avatar: "📊" },
  { id: "seed-3", name: "Rohan M.", points: 690, avatar: "🎨" },
  { id: "seed-4", name: "Sneha R.", points: 650, avatar: "🧬" },
  { id: "seed-5", name: "Vikram T.", points: 610, avatar: "💼" },
];

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return SEED_LEADERBOARD;
  const stored = safeParse<LeaderboardEntry[] | null>(
    localStorage.getItem(STORAGE_KEYS.leaderboard),
    null
  );
  if (!stored) {
    localStorage.setItem(
      STORAGE_KEYS.leaderboard,
      JSON.stringify(SEED_LEADERBOARD)
    );
    return [...SEED_LEADERBOARD];
  }
  return stored;
}

export function setLeaderboard(entries: LeaderboardEntry[]): void {
  localStorage.setItem(STORAGE_KEYS.leaderboard, JSON.stringify(entries));
}

export function syncUserToLeaderboard(user: UserProfile): void {
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

export function addPoints(amount: number): UserProfile | null {
  const user = getUser();
  if (!user) return null;
  const updated = { ...user, points: user.points + amount };
  setUser(updated);
  return updated;
}

export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  localStorage.setItem(
    STORAGE_KEYS.leaderboard,
    JSON.stringify(SEED_LEADERBOARD)
  );
}
