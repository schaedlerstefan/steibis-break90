(function initCoursePilotReview(global) {
  "use strict";

  function compareRound(round, context = {}) {
    const core = global.CoursePilotCore;
    const targets = context.targets || [];
    const riskHoles = context.riskHoles || [];
    const officialAverages = context.officialAverages || {};
    const practiceRound = context.practiceRound || null;
    const completed = core.completedHoles(round);
    const perHole = completed.map((hole) => {
      const score = core.scoreHole(hole);
      const target = targets[hole.hole - 1] || hole.par + 1;
      const practiceHole = practiceRound?.holes?.[hole.hole - 1];
      const practiceScore = practiceHole ? core.scoreHole(practiceHole) : null;
      const historical = officialAverages[hole.hole] ?? null;
      return {
        hole: hole.hole,
        score,
        target,
        delta: score - target,
        isRisk: riskHoles.includes(hole.hole),
        historical,
        vsHistorical: historical == null ? null : Number((score - historical).toFixed(1)),
        practiceScore,
        vsPractice: practiceScore ? score - practiceScore : null,
        cause: hole.cause || "",
        decision: hole.observation?.decision || "",
      };
    });
    const totalScore = perHole.reduce((sum, hole) => sum + hole.score, 0);
    const totalTarget = perHole.reduce((sum, hole) => sum + hole.target, 0);
    const risk = perHole.filter((hole) => hole.isRisk);
    const goodDecisions = perHole.filter((hole) => hole.decision === "gut").length;
    const causes = perHole.reduce((acc, hole) => {
      if (hole.cause) acc[hole.cause] = (acc[hole.cause] || 0) + 1;
      return acc;
    }, {});
    const mainCause = Object.entries(causes).sort((a, b) => b[1] - a[1])[0]?.[0] || "noch offen";
    return {
      holes: perHole.length,
      totalScore,
      totalTarget,
      delta: totalScore - totalTarget,
      riskDelta: risk.reduce((sum, hole) => sum + hole.delta, 0),
      riskOnPlan: risk.filter((hole) => hole.delta <= 0).length,
      riskPlayed: risk.length,
      goodDecisions,
      mainCause,
      perHole,
    };
  }

  function weeklyFocus(review) {
    if (!review?.holes) return ["Proberundendaten sammeln", "85–90-m-Schlag kalibrieren"];
    const focus = [];
    if (review.riskDelta > 0) focus.push("Risikoloch-Pläne ohne zweiten Fehler trainieren");
    if (review.mainCause !== "noch offen") focus.push(`${review.mainCause} als häufigsten Ursachen-Tag bearbeiten`);
    if (review.goodDecisions < Math.ceil(review.holes * 0.6)) focus.push("Pre-Shot-Entscheidung und sichere Zielseite festigen");
    if (!focus.length) focus.push("Stabilität des aktuellen Plans bestätigen");
    return focus.slice(0, 2);
  }

  global.CoursePilotReview = Object.freeze({ compareRound, weeklyFocus });
}(window));
