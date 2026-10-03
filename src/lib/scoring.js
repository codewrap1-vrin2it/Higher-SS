import { RIASEC_KEYS, SKILL_KEYS } from "./constants";
const defaultSkills = () => Object.fromEntries(SKILL_KEYS.map((k) => [k, 3]));
export function aggregateAnswers(options) {
    const riasec = Object.fromEntries(RIASEC_KEYS.map((k) => [k, 0]));
    const academic = { STEM: 0, Humanities: 0, Business: 0 };
    const skillSums = Object.fromEntries(SKILL_KEYS.map((k) => [k, 0]));
    const skillCounts = Object.assign({}, skillSums);
    options.forEach((opt) => {
        if (opt.riasec) {
            Object.entries(opt.riasec).forEach(([k, v]) => {
                riasec[k] += v;
            });
        }
        if (opt.academic) {
            Object.entries(opt.academic).forEach(([k, v]) => {
                academic[k] += v;
            });
        }
        if (opt.skills) {
            Object.entries(opt.skills).forEach(([k, v]) => {
                skillSums[k] += v;
                skillCounts[k] += 1;
            });
        }
    });
    const normalize = (vals, min = 1, max = 5) => {
        const rawMax = Math.max(...vals, 1);
        return vals.map((v) => Math.min(max, Math.max(min, min + (v / rawMax) * (max - min))));
    };
    const riasecArr = normalize(RIASEC_KEYS.map((k) => riasec[k]));
    const riasecNorm = Object.fromEntries(RIASEC_KEYS.map((k, i) => [k, Math.round(riasecArr[i] * 10) / 10]));
    const skills = Object.assign({}, defaultSkills());
    SKILL_KEYS.forEach((k) => {
        if (skillCounts[k] > 0) {
            skills[k] = Math.min(5, Math.max(1, Math.round((skillSums[k] / skillCounts[k]) * 10) / 10));
        }
        else {
            const topRiasec = RIASEC_KEYS.reduce((best, key) => riasecNorm[key] > riasecNorm[best] ? key : best);
            const boost = topRiasec === "Investigative" || topRiasec === "Realistic"
                ? "Analytical"
                : topRiasec === "Artistic"
                    ? "Creative"
                    : topRiasec === "Social"
                        ? "Communication"
                        : "Problem Solving";
            skills[boost] = Math.min(5, riasecNorm[topRiasec]);
        }
    });
    return { riasec: riasecNorm, academic, skills };
}
export function careerMatchPercent(userSkills, career) {
    let sum = 0;
    SKILL_KEYS.forEach((k) => {
        const diff = 5 - Math.abs(userSkills[k] - career.skillBenchmark[k]);
        sum += diff;
    });
    return Math.round((sum / (SKILL_KEYS.length * 5)) * 100);
}
export function skillGaps(userSkills, benchmark) {
    return SKILL_KEYS.map((skill) => ({
        skill,
        delta: Math.round((userSkills[skill] - benchmark[skill]) * 10) / 10,
    }));
}
