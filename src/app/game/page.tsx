import { useCallback, useEffect, useState } from "react";
import { Timer, Zap } from "lucide-react";
import { skillRushRounds } from "@/data/skillRush";
import { POINTS } from "@/lib/points";
import { useApp } from "@/context/AppContext";

const GAME_SECONDS = 60;
const TARGET_MATCHES = 5;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SkillRushPage() {
  const { awardPoints } = useApp();
  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [roundIndex, setRoundIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [order, setOrder] = useState<number[]>([]);
  const [rounds, setRounds] = useState(() => shuffle(skillRushRounds).slice(0, 8));

  const current = rounds[roundIndex % rounds.length];

  useEffect(() => {
    if (!playing || finished) return;
    if (timeLeft <= 0) {
      setFinished(true);
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [playing, timeLeft, finished]);

  const start = () => {
    setRounds(shuffle(skillRushRounds).slice(0, 8));
    setPlaying(true);
    setTimeLeft(GAME_SECONDS);
    setRoundIndex(0);
    setCorrectCount(0);
    setFinished(false);
    setOrder(shuffle([0, 1, 2, 3]));
  };

  const pickSkill = useCallback(
    (skill: string) => {
      if (!playing || !current || finished) return;
      if (skill === current.correctSkill) {
        const nextCorrect = correctCount + 1;
        setCorrectCount(nextCorrect);
        awardPoints(POINTS.skillRushPerMatch, "Career Matcher correct!");
        if (nextCorrect >= TARGET_MATCHES) {
          setFinished(true);
          setPlaying(false);
          return;
        }
        setRoundIndex((i) => i + 1);
        setOrder(shuffle([0, 1, 2, 3]));
      } else {
        setTimeLeft((t) => Math.max(0, t - 3));
      }
    },
    [playing, current, finished, correctCount, awardPoints]
  );

  const skillsShown = current
    ? order.map((i) => current.skills[i]).filter(Boolean)
    : [];

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Zap className="h-7 w-7 text-amber-500" />
          Skill Rush — Career Matcher
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          60 seconds · Match the key skill to each career · +{POINTS.skillRushPerMatch} pts
          per correct answer · Win at {TARGET_MATCHES} matches.
        </p>
      </div>

      {!playing && !finished && (
        <button
          type="button"
          onClick={start}
          className="w-full rounded-xl bg-indigo-600 py-4 font-bold text-white"
        >
          Start Game
        </button>
      )}

      {(playing || finished) && current && (
        <div className="rounded-2xl border bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex justify-between text-sm font-medium">
            <span className="flex items-center gap-1">
              <Timer className="h-4 w-4" /> {timeLeft}s
            </span>
            <span>
              Correct: {correctCount} / {TARGET_MATCHES}
            </span>
          </div>
          <p className="mt-6 text-center text-lg font-semibold">
            Which skill fits <span className="text-indigo-600">{current.careerTitle}</span>?
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {skillsShown.map((skill) => (
              <button
                key={skill}
                type="button"
                disabled={!playing}
                onClick={() => pickSkill(skill)}
                className="rounded-xl border py-4 text-sm font-medium transition hover:border-indigo-500 hover:bg-indigo-50 disabled:opacity-50 dark:hover:bg-indigo-950"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      {finished && (
        <div className="rounded-xl bg-indigo-50 p-4 text-center dark:bg-indigo-950/40">
          <p className="font-bold">Time&apos;s up or target reached!</p>
          <p className="text-sm">You scored {correctCount} correct matches.</p>
          <button type="button" onClick={start} className="mt-3 text-indigo-600 font-semibold">
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
