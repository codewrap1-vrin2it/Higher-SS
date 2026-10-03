import type { Question } from "@/lib/types";

export const questions: Question[] = [
  {
    id: "q1",
    text: "When working on a school project, I enjoy building or fixing things with my hands.",
    options: [
      { label: "Strongly disagree", riasec: { Realistic: 1 } },
      { label: "Disagree", riasec: { Realistic: 2 } },
      { label: "Neutral", riasec: { Realistic: 3 } },
      { label: "Agree", riasec: { Realistic: 4 }, skills: { Technical: 3.5 } },
      { label: "Strongly agree", riasec: { Realistic: 5 }, skills: { Technical: 4.5 } },
    ],
  },
  {
    id: "q2",
    text: "I like analyzing data, patterns, or scientific puzzles.",
    options: [
      { label: "Strongly disagree", riasec: { Investigative: 1 } },
      { label: "Disagree", riasec: { Investigative: 2 } },
      { label: "Neutral", riasec: { Investigative: 3 }, academic: { STEM: 2 } },
      { label: "Agree", riasec: { Investigative: 4 }, academic: { STEM: 4 }, skills: { Analytical: 4 } },
      { label: "Strongly agree", riasec: { Investigative: 5 }, academic: { STEM: 5 }, skills: { Analytical: 5 } },
    ],
  },
  {
    id: "q3",
    text: "Expressing ideas through art, design, writing, or performance energizes me.",
    options: [
      { label: "Strongly disagree", riasec: { Artistic: 1 } },
      { label: "Disagree", riasec: { Artistic: 2 } },
      { label: "Neutral", riasec: { Artistic: 3 } },
      { label: "Agree", riasec: { Artistic: 4 }, academic: { Humanities: 4 }, skills: { Creative: 4.5 } },
      { label: "Strongly agree", riasec: { Artistic: 5 }, academic: { Humanities: 5 }, skills: { Creative: 5 } },
    ],
  },
  {
    id: "q4",
    text: "Helping classmates learn or resolving conflicts comes naturally to me.",
    options: [
      { label: "Strongly disagree", riasec: { Social: 1 } },
      { label: "Disagree", riasec: { Social: 2 } },
      { label: "Neutral", riasec: { Social: 3 } },
      { label: "Agree", riasec: { Social: 4 }, skills: { Communication: 4 } },
      { label: "Strongly agree", riasec: { Social: 5 }, skills: { Communication: 5, "Problem Solving": 4 } },
    ],
  },
  {
    id: "q5",
    text: "I enjoy leading teams, pitching ideas, or organizing events.",
    options: [
      { label: "Strongly disagree", riasec: { Enterprising: 1 } },
      { label: "Disagree", riasec: { Enterprising: 2 } },
      { label: "Neutral", riasec: { Enterprising: 3 }, academic: { Business: 3 } },
      { label: "Agree", riasec: { Enterprising: 4 }, academic: { Business: 4 }, skills: { Communication: 4 } },
      { label: "Strongly agree", riasec: { Enterprising: 5 }, academic: { Business: 5 }, skills: { "Problem Solving": 4.5 } },
    ],
  },
  {
    id: "q6",
    text: "I prefer structured tasks like budgeting, filing, or detailed record-keeping.",
    options: [
      { label: "Strongly disagree", riasec: { Conventional: 1 } },
      { label: "Disagree", riasec: { Conventional: 2 } },
      { label: "Neutral", riasec: { Conventional: 3 } },
      { label: "Agree", riasec: { Conventional: 4 }, academic: { Business: 4 }, skills: { "Domain Knowledge": 4 } },
      { label: "Strongly agree", riasec: { Conventional: 5 }, academic: { Business: 5 }, skills: { Analytical: 4 } },
    ],
  },
  {
    id: "q7",
    text: "Physics, coding, or advanced math topics excite me more than other subjects.",
    options: [
      { label: "Strongly disagree", academic: { STEM: 1 } },
      { label: "Disagree", academic: { STEM: 2 } },
      { label: "Neutral", academic: { STEM: 3 } },
      { label: "Agree", academic: { STEM: 4 }, skills: { Technical: 4, Analytical: 4 } },
      { label: "Strongly agree", academic: { STEM: 5 }, skills: { Technical: 5, Analytical: 5 } },
    ],
  },
  {
    id: "q8",
    text: "History, literature, languages, or social studies are my favorite areas.",
    options: [
      { label: "Strongly disagree", academic: { Humanities: 1 } },
      { label: "Disagree", academic: { Humanities: 2 } },
      { label: "Neutral", academic: { Humanities: 3 } },
      { label: "Agree", academic: { Humanities: 4 }, skills: { Communication: 4, Creative: 3.5 } },
      { label: "Strongly agree", academic: { Humanities: 5 }, skills: { Communication: 5, "Domain Knowledge": 4 } },
    ],
  },
  {
    id: "q9",
    text: "When stuck on a tough problem, I persist until I find a creative solution.",
    options: [
      { label: "Strongly disagree", skills: { "Problem Solving": 1 } },
      { label: "Disagree", skills: { "Problem Solving": 2 } },
      { label: "Neutral", skills: { "Problem Solving": 3 } },
      { label: "Agree", skills: { "Problem Solving": 4, Analytical: 3.5 } },
      { label: "Strongly agree", skills: { "Problem Solving": 5, Analytical: 4.5 } },
    ],
  },
  {
    id: "q10",
    text: "I follow industry news and imagine how my skills could apply in real jobs.",
    options: [
      { label: "Strongly disagree", skills: { "Domain Knowledge": 1 } },
      { label: "Disagree", skills: { "Domain Knowledge": 2 } },
      { label: "Neutral", skills: { "Domain Knowledge": 3 } },
      { label: "Agree", skills: { "Domain Knowledge": 4, Communication: 3 } },
      { label: "Strongly agree", skills: { "Domain Knowledge": 5 }, riasec: { Enterprising: 4 } },
    ],
  },
];
