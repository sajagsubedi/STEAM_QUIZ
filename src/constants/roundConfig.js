export const ROUND_CONFIGS = {
  general: {
    key: "general",
    title: "General Round",
    logo: "/logos/general.png",
    flow: ["banner", "rules", "select", "question"],
    timers: [60, 30, 20, 20],
    rules: [
      "Questions from multiple domains",
      "Press Enter to reveal question",
      "Timer starts on next Enter",
    ],
    totalQuestions: 25,
  },

  alternative: {
    key: "alternative",
    title: "Alternative Round",
    logo: "/logos/alternative.png",
    flow: ["banner", "rules", "select", "question"],
    timers: [45, 30, 15],
    rules: ["Multiple choice questions", "Wrong answer triggers next timer"],
    totalQuestions: 24,
  },

  quickResponse: {
    key: "quickResponse",
    title: "Quick Response",
    logo: "/logos/qr.png",
    flow: ["banner", "rules", "question"],
    timers: [30],
    rules: ["Questions appear sequentially", "No question selection"],
    totalQuestions: 4,
  },

  av: {
    key: "av",
    title: "Audio / Visual",
    logo: "/logos/av.png",
    flow: ["banner", "rules", "select", "question"],
    timers: [30],
    rules: [
      "Audio or video based questions",
      "Observe carefully before answering",
    ],
    totalQuestions: 8,
  },

  gambling: {
    key: "gambling",
    title: "Gambling Round",
    logo: "/logos/gambling.png",
    flow: ["banner", "rules", "select", "question"],
    timers: [40, 20],
    rules: ["Teams choose their stake", "Higher risk, higher reward"],
    totalQuestions: 8,
  },

  abbreviation: {
    key: "abbreviation",
    title: "Abbreviation",
    logo: "/logos/abbr.png",
    flow: ["banner", "rules", "select", "question"],
    timers: [30],
    rules: ["Expand the given abbreviation"],
    totalQuestions: 8,
  },

  rapidFire: {
    key: "rapidFire",
    title: "Rapid Fire",
    logo: "/logos/rapid.png",
    flow: ["banner", "rules", "select", "question"],
    timers: [60],
    rules: ["Each set contains 10 questions", "One minute per set"],
    sets: 8,
  },

  estimation: {
    key: "estimation",
    title: "Estimation",
    logo: "/logos/estimate.png",
    flow: ["banner", "rules", "question"],
    timers: [60],
    rules: ["Closest answer wins", "Sequential questions"],
    totalQuestions: 2,
  },

  sequential: {
    key: "sequential",
    title: "Sequential",
    logo: "/logos/seq.png",
    flow: ["banner", "rules", "question"],
    timers: [60],
    rules: ["Questions appear one after another"],

    totalQuestions: 4,
  },

  open: {
    key: "open",
    title: "Open Round",
    logo: "/logos/open.png",

    flow: ["banner", "rules", "question"],

    timers: [30],
    rules: ["Open ended discussion", "Quizmaster controlled"],

    totalQuestions: 4,
  },
};
