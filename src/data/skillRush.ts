export interface SkillRushRound {
  careerTitle: string;
  skills: string[];
  correctSkill: string;
}

export const skillRushRounds: SkillRushRound[] = [
  { careerTitle: "Data Scientist", skills: ["Python", "Statistics", "SQL", "Storytelling"], correctSkill: "Statistics" },
  { careerTitle: "UI/UX Designer", skills: ["Figma", "User Research", "Tax Audit", "Wireframes"], correctSkill: "User Research" },
  { careerTitle: "Chartered Accountant", skills: ["Ind AS", "Auditing", "React Hooks", "GST"], correctSkill: "Auditing" },
  { careerTitle: "Clinical Psychologist", skills: ["CBT", "Active Listening", "Docker", "Diagnosis"], correctSkill: "Active Listening" },
  { careerTitle: "Software Developer", skills: ["Git", "APIs", "Poetry Analysis", "Debugging"], correctSkill: "Debugging" },
  { careerTitle: "Renewable Energy Engineer", skills: ["Solar PV", "Thermodynamics", "SEO", "Grid Design"], correctSkill: "Solar PV" },
  { careerTitle: "Digital Content Strategist", skills: ["SEO", "Content Calendar", "CAD", "Analytics"], correctSkill: "Content Calendar" },
  { careerTitle: "Biomedical Researcher", skills: ["Lab Safety", "Cell Culture", "Brand Design", "PCR"], correctSkill: "Cell Culture" },
];
