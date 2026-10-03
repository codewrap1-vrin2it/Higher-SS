import type { RoadmapMilestone } from "@/lib/types";

export const roadmapMilestones: RoadmapMilestone[] = [
  {
    id: "hs-1",
    stage: 1,
    title: "Stream alignment & subject plan",
    description: "Finalize PCM/PCB/Commerce/Humanities electives with teacher counselor.",
  },
  {
    id: "hs-2",
    stage: 1,
    title: "Olympiad / NTSE / KVPY exploration",
    description: "Register for one national-level exam or olympiad in your strength area.",
  },
  {
    id: "hs-3",
    stage: 1,
    title: "Grade 12 board exam strategy",
    description: "Create monthly revision map and mock test schedule.",
  },
  {
    id: "he-1",
    stage: 2,
    title: "Shortlist degrees & entrance exams",
    description: "Map top 5 colleges and exam dates (JEE/NEET/CUET/CLAT/etc.).",
  },
  {
    id: "he-2",
    stage: 2,
    title: "Core coursework plan",
    description: "Identify 4 foundational courses for your target degree.",
  },
  {
    id: "he-3",
    stage: 2,
    title: "Internship or summer program",
    description: "Apply to one guided internship or university summer school.",
  },
  {
    id: "ir-1",
    stage: 3,
    title: "Portfolio / GitHub / Behance project",
    description: "Publish one showcase project linked to your target career.",
  },
  {
    id: "ir-2",
    stage: 3,
    title: "Free certification (NPTEL / freeCodeCamp)",
    description: "Complete one verified or project-based free credential.",
  },
  {
    id: "ir-3",
    stage: 3,
    title: "Industry readiness mock interview",
    description: "Practice with a mentor, teacher, or peer career circle.",
  },
];

export const STAGE_LABELS: Record<1 | 2 | 3, string> = {
  1: "High School (Grades 11–12)",
  2: "Higher Education",
  3: "Industry Readiness",
};
