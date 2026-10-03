export type Stream = "Science" | "Commerce" | "Humanities" | "Vocational";

export type Grade = "11" | "12";

export type SkillKey =
  | "Analytical"
  | "Technical"
  | "Creative"
  | "Communication"
  | "Problem Solving"
  | "Domain Knowledge";

export type SkillProfile = Record<SkillKey, number>;

export type RiasecKey =
  | "Realistic"
  | "Investigative"
  | "Artistic"
  | "Social"
  | "Enterprising"
  | "Conventional";

export type AcademicInclination = "STEM" | "Humanities" | "Business";

export interface UserProfile {
  id: string;
  name: string;
  grade: Grade;
  stream: Stream;
  avatar: string;
  points: number;
  onboardedAt: string;
  bookmarkedCareerIds: string[];
  assessmentCompleted: boolean;
  bookmarkPointsAwarded: boolean;
}

export interface AssessmentScores {
  riasec: Record<RiasecKey, number>;
  academic: Record<AcademicInclination, number>;
  skills: SkillProfile;
  completedAt: string;
}

export interface Career {
  id: string;
  title: string;
  stream: Stream | "Any";
  industry: string;
  growthOutlook: "High" | "Moderate" | "Emerging";
  entrySalary: string;
  description: string;
  skillBenchmark: SkillProfile;
  degrees: string[];
  entranceExams: string[];
  riasecFit: Partial<Record<RiasecKey, number>>;
}

export interface Resource {
  id: string;
  title: string;
  platform: string;
  url: string;
  skillTags: SkillKey[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  avatar: string;
  isUser?: boolean;
}

export interface RoadmapMilestone {
  id: string;
  stage: 1 | 2 | 3;
  title: string;
  description: string;
}

export interface QuestionOption {
  label: string;
  riasec?: Partial<Record<RiasecKey, number>>;
  academic?: Partial<Record<AcademicInclination, number>>;
  skills?: Partial<SkillProfile>;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}
