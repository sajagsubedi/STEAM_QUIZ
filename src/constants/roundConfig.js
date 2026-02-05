export const ROUND_CONFIGS = {
  general: {
    key: "general",
    title: "General Round",
    logo: "/logos/general.png",
    flow: ["banner", "rules", "select", "question"],
    timers: [30, 15, 10, 10, 10, 10, 10, 10, 5, 5],
    marks: [10, 8, 6, 4, 2, 2, 2, 2, 2, 2],
    rules: [
      "20 Questions total",
      "Decreasing points and time per pass",
      "Passing allowed",
    ],
    totalQuestions: 20,
  },
  elimination1: {
    key: "elimination1",
    title: "Elimination Round",
    logo: "/logos/elimination.png",
    flow: ["banner", "rules", "subselection", "select", "question"],
    timers: [60],
    rules: [
      "Choose a subject: Art & Sports, History, PCM, Literature & Geography",
      "One minute per subject set",
    ],
    subjects: 4,
    questionsPerSubject: 8,
  },

  alternative: {
    key: "alternative",
    title: "Alternative Round",
    logo: "/logos/alternative.png",
    flow: ["banner", "rules", "select", "question"],
    timers: [45, 15],
    marks: [10, 5],
    rules: [
      "16 Questions total",
      "One pass allowed only",
      "10 points direct, 5 on pass",
    ],
    totalQuestions: 16,
  },
  elimination2: {
    key: "elimination2",
    title: "Elimination Round",
    logo: "/logos/elimination.png",
    flow: ["banner", "rules", "subselection", "select", "question"],
    timers: [60],
    rules: [
      "Choose a subject: Art & Sports, History, PCM, Literature & Geography",
      "One minute per subject set",
    ],
    subjects: 4,
    questionsPerSubject: 8,
  },

  quickResponse: {
    key: "quickResponse",
    title: "Quick Response",
    logo: "/logos/qr.png",
    flow: ["banner", "rules", "question"],
    timers: [60],
    marks: { correct: 20, wrong: -10 },
    rules: [
      "6 Questions total",
      "1 minute per question",
      "Negative marking applies",
    ],
    totalQuestions: 6,
  },

    rapidFire: {
    key: "rapidFire",
    title: "Rapid Fire Round",
    logo: "/logos/rapid.png",
    flow: ["banner", "rules", "select", "question"],
    timers: [60],
    marks: 5, // per correct answer
    rules: ["6 Questions per team", "1 minute total for the set"],
    sets: 8,
  },
  

  av: {
    key: "av",
    title: "Audio / Visual Round",
    logo: "/logos/av.png",
    flow: ["banner", "rules", "select", "question"],
    timers: [60],
    marks: 15,
    rules: ["6 Questions total", "1 minute per question", "Observe carefully"],
    totalQuestions: 6,
  },
  

  contemporary: {
    key: "contemporary",
    title: "Contemporary Round",
    logo: "/logos/contemporary.png",
    flow: ["banner", "rules", "select", "question"],
    timers: [45],
    marks: 15,
    rules: ["12 Questions total", "45 seconds per question"],
    totalQuestions: 12,
  },

  
  
  open: {
    key: "open",
    title: "Open Round",
    logo: "/logos/open.png",
    flow: ["banner", "rules", "question"],
    timers: [300], // 5 minutes
    marks: 30,
    rules: ["1 Question for all teams", "Discussion based"],
    totalQuestions: 1,
  },
  
  gambling: {
    key: "gambling",
    title: "Gambling Round",
    logo: "/logos/gambling.png",
    flow: ["banner", "rules", "question"],
    timers: [60],
    rules: [
      "2 Rounds (different questions for each team)",
      "Stake between 5-20 points",
      "Correct: Double the stake | Wrong: Minus the stake",
    ],
    points: [5, 10, 15, 20],
    totalQuestions: 2,
  },
};
