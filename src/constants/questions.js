export const QUESTIONS = {
  /* ───────────── GENERAL ROUND (8) ───────────── */
  general: [
    {
      id: 1,
      text: "A man is standing at the edge of a 1m deep swimming pool, completely filled with a liquid of refractive index 3/2 . The eyes of the man are 3 m above the ground. A coin located at the bottom of the pool appears to be at an angle of depression of 30 degree with reference to the eye of man. Then find horizontal distance in mm (represented by x in the figure) of the coin from the eye of the man.",
      media: {
        type: "image",
        src: "/questions/gq1.png",
      },
      answer: "4000mm",
    },
    {
      id: 2,
      text: "Express in percentage how full is the bottle. The second figure is a representation when bottle in the first figure is inverted.",
      media: {
        type: "image",
        src: "/questions/gq2.png",
      },
      answer: "66.667m",
    },
    {
      id: 3,
      text: "An alloy of metals A and B contains atoms in the ratio of 2 : 5 and weighs 36 g. The percentage of metal A in the sample is 22.22% (by mass). If atomic mass of A is 40, the atomic mass of metal B is ?  ",
      answer: "56 amu",
    },
    {
      id: 4,
      text: "10 mL of a gaseous hydrocarbon was burnt completely in 80 mL of O2 at NTP. On cooling, the gas occupied 70 ml at N.T.P. This volume became 50 mL on treatment with KOH solution. The formula of the hydrocarbon is?  ",
      answer: "C2H4",
    },
    {
      id: 5,
      text: "If the line 2x+y = k passes through the point which divides the line segment joining the points (1, 1) and (2, 4) in the ratio 3 : 2, then k equals? ",
      answer: "6",
    },
    {
      id: 6,
      text: "What is the dimensional formula of resistivity? ",
      answer: "M¹L³T⁻³A⁻²",
    },
    {
      id: 7,
      text: "The empirical formula of sucrose is",
      answer: "C₁₂H₂₂O₁₁",
    },
    {
      id: 8,
      text: "What is the angle(in circular measure) between the hour hand and the minute hand of a clock when the time is half past 4 ? ",
      answer: "𝛑/𝟒 RADIAN",
    },
    {
      id: 8,
      text: "Two ships are 80 km apart on North–South vertical at an instant  The one farther North is streaming south at 40 km/hour and the other is streaming East at 30 km/hr. What is their distance of closest approach?  ",
      answer: "48 km",
    },
  ],

  /* ───────────── ALTERNATIVE ROUND (8) ───────────── */
  alternative: [
    {
      id: 1,
      text: "Sun rises in?",
      options: ["North", "South", "East", "West"],
      answer: "East",
    },
    {
      id: 2,
      text: "5 × 6 = ?",
      options: ["20", "25", "30", "35"],
      answer: "30",
    },
    {
      id: 3,
      text: "Water freezes at?",
      options: ["0°C", "50°C", "100°C", "10°C"],
      answer: "0°C",
    },
    {
      id: 4,
      text: "Currency of Japan?",
      options: ["Won", "Dollar", "Yen", "Peso"],
      answer: "Yen",
    },
    {
      id: 5,
      text: "Earth is ___ planet from Sun?",
      options: ["2nd", "3rd", "4th", "5th"],
      answer: "3rd",
    },
    {
      id: 6,
      text: "HTML stands for?",
      options: ["HighText", "HyperText Markup Language", "HyperTool", "None"],
      answer: "HyperText Markup Language",
    },
    {
      id: 7,
      text: "Largest mammal?",
      options: ["Elephant", "Blue Whale", "Shark", "Giraffe"],
      answer: "Blue Whale",
    },
    {
      id: 8,
      text: "CPU is part of?",
      options: ["RAM", "Motherboard", "Processor", "Storage"],
      answer: "Processor",
    },
  ],

  /* ───────────── QUICK RESPONSE (4 SEQUENTIAL) ───────────── */
  quickResponse: [
    { id: 1, text: "2 + 2?", answer: "4" },
    { id: 2, text: "Capital of India?", answer: "New Delhi" },
    { id: 3, text: "How many continents?", answer: "7" },
    { id: 4, text: "Square root of 16?", answer: "4" },
  ],

  /* ───────────── A / V ROUND (8) ───────────── */
  av: [
    {
      id: 1,
      text: "Identify the monument.",
      media: { type: "image", src: "/av/tajmahal.jpg" },
      answer: "Taj Mahal",
    },
    {
      id: 2,
      text: "Identify the sound.",
      media: { type: "audio", src: "/av/lion-roar.mp3" },
      answer: "Lion",
    },
    {
      id: 3,
      text: "Identify the instrument.",
      media: { type: "image", src: "/av/guitar.jpg" },
      answer: "Guitar",
    },
    {
      id: 4,
      text: "Identify the logo.",
      media: { type: "image", src: "/av/nike.png" },
      answer: "Nike",
    },
    {
      id: 5,
      text: "Identify the animal.",
      media: { type: "video", src: "/av/cheetah.mp4" },
      answer: "Cheetah",
    },
    {
      id: 6,
      text: "Identify the place.",
      media: { type: "image", src: "/av/eiffel.jpg" },
      answer: "Eiffel Tower",
    },
    {
      id: 7,
      text: "Identify the voice.",
      media: { type: "audio", src: "/av/morgan-freeman.mp3" },
      answer: "Morgan Freeman",
    },
    {
      id: 8,
      text: "Identify the personality.",
      media: { type: "image", src: "/av/einstein.jpg" },
      answer: "Albert Einstein",
    },
  ],

  /* ───────────── GAMBLING ROUND (8) ───────────── */
  gambling: [
    { id: 1, text: "How many bones in human body?", answer: "206" },
    { id: 2, text: "Value of π (approx)?", answer: "3.14" },
    { id: 3, text: "Who invented telephone?", answer: "Alexander Graham Bell" },
    { id: 4, text: "Largest desert?", answer: "Sahara" },
    { id: 5, text: "Speed of light?", answer: "3 × 10⁸ m/s" },
    { id: 6, text: "Founder of Microsoft?", answer: "Bill Gates" },
    { id: 7, text: "First man on moon?", answer: "Neil Armstrong" },
    { id: 8, text: "Most spoken language?", answer: "Mandarin Chinese" },
  ],

  /* ───────────── ABBREVIATION ROUND (8) ───────────── */
  abbreviation: [
    { id: 1, text: "CPU", answer: "Central Processing Unit" },
    { id: 2, text: "RAM", answer: "Random Access Memory" },
    { id: 3, text: "URL", answer: "Uniform Resource Locator" },
    { id: 4, text: "HTTP", answer: "HyperText Transfer Protocol" },
    { id: 5, text: "GDP", answer: "Gross Domestic Product" },
    {
      id: 6,
      text: "UNESCO",
      answer:
        "United Nations Educational, Scientific and Cultural Organization",
    },
    {
      id: 7,
      text: "NASA",
      answer: "National Aeronautics and Space Administration",
    },
    { id: 8, text: "WHO", answer: "World Health Organization" },
  ],

  /* ───────────── SEQUENTIAL ROUND (4) ───────────── */
  sequential: [
    { id: 1, text: "First letter of alphabet?", answer: "A" },
    { id: 2, text: "Second letter?", answer: "B" },
    { id: 3, text: "Third letter?", answer: "C" },
    { id: 4, text: "Fourth letter?", answer: "D" },
  ],

  /* ───────────── ESTIMATION (2) ───────────── */
  estimation: [
    { id: 1, text: "Estimate population of Nepal.", answer: "≈30 million" },
    { id: 2, text: "Estimate height of Mount Everest (m).", answer: "≈8849 m" },
  ],

  /* ───────────── RAPID FIRE (8 SETS × 10) ───────────── */
  rapidFire: [
    {
      setId: 1,
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        text: `Rapid Q${i + 1}`,
        answer: "Sample Answer",
      })),
    },
    {
      setId: 2,
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        text: `Rapid Q${i + 1}`,
        answer: "Sample Answer",
      })),
    },
    {
      setId: 3,
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        text: `Rapid Q${i + 1}`,
        answer: "Sample Answer",
      })),
    },
    {
      setId: 4,
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        text: `Rapid Q${i + 1}`,
        answer: "Sample Answer",
      })),
    },
    {
      setId: 5,
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        text: `Rapid Q${i + 1}`,
        answer: "Sample Answer",
      })),
    },
    {
      setId: 6,
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        text: `Rapid Q${i + 1}`,
        answer: "Sample Answer",
      })),
    },
    {
      setId: 7,
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        text: `Rapid Q${i + 1}`,
        answer: "Sample Answer",
      })),
    },
    {
      setId: 8,
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        text: `Rapid Q${i + 1}`,
        answer: "Sample Answer",
      })),
    },
  ],

  /* ───────────── OPEN ROUND (4 SEQUENTIAL) ───────────── */
  open: [
    { id: 1, text: "Open question 1", answer: "Open Answer 1" },
    { id: 2, text: "Open question 2", answer: "Open Answer 2" },
    { id: 3, text: "Open question 3", answer: "Open Answer 3" },
    { id: 4, text: "Open question 4", answer: "Open Answer 4" },
  ],
};
