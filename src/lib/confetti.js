import confetti from "canvas-confetti";
export function celebratePoints() {
    confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd"],
    });
}
