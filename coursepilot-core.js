(function initCoursePilotCore(global) {
  "use strict";

  function scoreHole(hole) {
    if (!hole) return 0;
    if (hole.scratched) return 10;
    return (hole.shots || []).reduce((sum, shot) => sum + (shot.penalty ? 2 : 1), 0);
  }

  function playedHoles(round) {
    return (round?.holes || []).filter((hole) => (hole.shots || []).length > 0 || hole.scratched);
  }

  function completedHoles(round) {
    return (round?.holes || []).filter((hole) => hole.completed && ((hole.shots || []).length > 0 || hole.scratched));
  }

  function livePlanStatus(round, targets, maxScore = 89) {
    const completed = completedHoles(round);
    const completedScore = completed.reduce((sum, hole) => sum + scoreHole(hole), 0);
    const completedTarget = completed.reduce((sum, hole) => sum + (targets[hole.hole - 1] || hole.par + 1), 0);
    const totalPlan = targets.reduce((sum, value) => sum + value, 0);
    const delta = completedScore - completedTarget;
    const projected = totalPlan + delta;
    return {
      completedCount: completed.length,
      completedScore,
      completedTarget,
      delta,
      projected,
      reserve: maxScore - projected,
      strokesLeft: maxScore - completedScore,
      holesLeft: Math.max(0, 18 - completed.length),
      maxScore,
    };
  }

  function trafficLight(input = {}) {
    const club = String(input.club || "").toLowerCase();
    const lie = input.lie || "tee";
    const risk = Number(input.risk || 0);
    const hasPenalty = Boolean(input.hasPenalty);
    const isFairwayWood = club.includes("fairway") || club.includes("holz 4") || club.includes("gt2");
    const isDriver = club.includes("driver");

    if (isDriver) return { level: "red", label: "Rot", reason: "Driver bleibt 2026 zuhause." };
    if (isFairwayWood && !["tee", "excellent"].includes(lie)) {
      return { level: "red", label: "Rot", reason: "Fairwayholz nur vom Tee oder aus sehr guter Fairwaylage." };
    }
    if (hasPenalty || risk >= 65) {
      return { level: "red", label: "Rot", reason: "Großen Fehler vermeiden: größte sichere Fläche und kürzere Option wählen." };
    }
    if (risk >= 40 || (isFairwayWood && lie === "excellent")) {
      return { level: "yellow", label: "Gelb", reason: "Nur spielen, wenn Zielbild, Lage und Tagesgefühl klar passen." };
    }
    return { level: "green", label: "Grün", reason: "Standardschlag in die breite Zielzone." };
  }

  global.CoursePilotCore = Object.freeze({ scoreHole, playedHoles, completedHoles, livePlanStatus, trafficLight });
}(window));
