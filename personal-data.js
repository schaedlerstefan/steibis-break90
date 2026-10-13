/* Public CoursePilot placeholder. Personal handicap, round and club data stay private. */
const PUBLIC_HOLE_PLAN = Object.freeze({
  tee: "Sicherster Schläger",
  route: "Ball in der breiten Spielzone halten",
  next: "Grünmitte oder größte Landezone",
  note: "Wind, Lage und Tagesform prüfen.",
  observe: "Zielbild, Tagesform und eine freie nächste Position.",
});

window.COURSEPILOT_PERSONAL_DATA = Object.freeze({
  holePlans: Array.from({ length: 18 }, () => PUBLIC_HOLE_PLAN),
});
