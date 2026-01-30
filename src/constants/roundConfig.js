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
  elimination1: {
    key: "elimination1",
    title: "Elimination Round",
    logo: "/logos/abbr.png",
    flow: ["banner", "rules", "subselection", "select", "question"],
    timers: [60],
    rules: [
      "Choose a subject",
      "8 questions per subject",
      "One minute per subject",
    ],
    subjects: 6,
    questionsPerSubject: 8,
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
  elimination2: {
    key: "elimination2",
    title: "Elimination Round",
    logo: "/logos/abbr.png",
    flow: ["banner", "rules", "subselection", "select", "question"],
    timers: [60],
    rules: [
      "Choose a subject",
      "8 questions per subject",
      "One minute per subject",
    ],
    subjects: 6,
    questionsPerSubject: 8,
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
    title: "Audio / Visual Round",
    logo: "/logos/av.png",
    flow: ["banner", "rules", "select", "question"],
    timers: [30],
    rules: [
      "Audio or video based questions",
      "Observe carefully before answering",
    ],
    totalQuestions: 6,
  },

  gambling: {
    key: "gambling",
    title: "Gambling Round",
    logo: "/logos/gambling.png",
    flow: ["banner", "rules", "question"],
    timers: [40, 20],
    rules: ["Teams choose their stake", "Higher risk, higher reward"],
    totalQuestions: 1,
  },
  rapidFire: {
    key: "rapidFire",
    title: "Rapid Fire Round",
    logo: "/logos/rapid.png",
    flow: ["banner", "rules", "select", "question"],
    timers: [60],
    rules: ["Each set contains 10 questions", "One minute per set"],
    sets: 8,
  },


  contempory: {
    key: "contempory",
    title: "Contempory Round",
    logo: "/logos/seq.png",
    flow: ["banner", "rules", "select", "question"],
    timers: [60, 30, 20, 20],
    rules: ["Questions appear one after another"],

    totalQuestions: 8,
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
