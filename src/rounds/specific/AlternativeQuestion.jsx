import React, { useState, useEffect, useRef } from "react";
import CircularTimer from "../../components/CircularTimer";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";
import { ROUND_CONFIGS } from "../../constants/roundConfig";
import { ChevronRight, Trophy } from "lucide-react";

const OPTION_LABELS = ["A", "B", "C", "D"];

export const AlternativeQuestion = () => {
  const { selectedQuestion, nextInRound } = useNavigationStore();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [wrongOptions, setWrongOptions] = useState([]);

  const currentQuestion = QUESTIONS.alternative.find(
    (q) => q.id === selectedQuestion,
  );
  const config = ROUND_CONFIGS["alternative"];

  // Audio Refs
  const audioRef = useRef({
    lock: new Audio("/sounds/kbc-lock.mp3"),
    right: new Audio("/sounds/kbc-right-answer.mp3"),
    wrong: new Audio("/sounds/kbc-wrong-answer.mp3"),
  });

  // Function to stop specific audio
  const stopAudio = (key) => {
    if (audioRef.current[key]) {
      audioRef.current[key].pause();
      audioRef.current[key].currentTime = 0;
    }
  };

  const handleSelect = (index) => {
    if (isLocked || showResult || wrongOptions.includes(index)) return;

    setSelectedIndex(index);
    setIsLocked(true);

    // Play Lock-in Sound
    stopAudio("lock");
    audioRef.current.lock.play().catch(() => {});

    // Suspense Delay (The "Yellow" Phase)
    setTimeout(() => {
      // STOP LOCK SOUND IMMEDIATELY before playing result
      stopAudio("lock");

      if (index === answer) {
        audioRef.current.right.play().catch(() => {});
        setShowResult(true);
      } else {
        audioRef.current.wrong.play().catch(() => {});
        setWrongOptions((prev) => [...prev, index]);
        // We stay "Locked" briefly so the user sees the Red color on the option
        setIsLocked(false);
        setSelectedIndex(null);
      }
    }, 2000);
  };

  const getOptionClass = (index) => {
    const base =
      "relative overflow-hidden rounded-xl p-4 flex gap-4 items-center border-2 transition-all duration-300 shadow-xl min-h-[80px]";

    // 1. Correct Answer Reveal (Green)
    if (showResult && index === answer) {
      return `${base} bg-green-600 border-green-400 text-white scale-105 z-10 shadow-green-500/50`;
    }

    // 2. Wrong Answer Selection (Red) - Shown immediately after yellow phase
    if (wrongOptions.includes(index)) {
      return `${base} bg-red-600 border-red-400 text-white shadow-red-500/50`;
    }

    // 3. Waiting / Lock Phase (Yellow)
    if (isLocked && index === selectedIndex) {
      return `${base} bg-yellow-500 border-white text-black animate-pulse scale-105 z-10`;
    }

    // 4. Default / Disabled states
    if (isLocked || showResult) {
      return `${base} bg-blue-950/20 border-white/5 text-white/20 cursor-not-allowed grayscale`;
    }

    return `${base} bg-blue-900/40 border-blue-400/30 text-white hover:border-yellow-400 hover:bg-blue-800/60 cursor-pointer group`;
  };

  if (!currentQuestion) return null;
  const { media, options, answer, text } = currentQuestion;
  const hasImage = media?.type === "image" && media?.src;
  const hasText = Boolean(text);

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden bg-linear-to-br from-gray-900 via-blue-900 to-black relative p-4 md:p-6">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* TOP HEADER */}
      <div className="relative z-10 flex justify-center items-center h-14 shrink-0">
        <div className="px-8 py-2 bg-linear-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full text-black text-xs font-black uppercase tracking-widest shadow-lg">
          {config.title}
        </div>
        <div className="absolute right-0 w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-black font-black text-xl transform rotate-3 shadow-lg -translate-x-[100%]">
          {currentQuestion.id}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-0 py-4 px-12">
        {hasText && (
          <div className="w-full max-w-5xl bg-blue-900/40 backdrop-blur-md border-2 border-blue-400/30 rounded-2xl shadow-2xl p-6 mb-6">
            <h2 className="text-white font-bold leading-tight text-center text-2xl">
              {text}
            </h2>
          </div>
        )}

        <div
          className={`w-full max-w-6xl flex ${hasText && hasImage ? "flex-row" : "flex-col"} items-center gap-8`}
        >
          {hasImage && (
            <div
              className={`${hasText && hasImage ? "w-1/2" : "w-full"} flex justify-center max-h-[40vh]`}
            >
              <img
                src={media.src}
                className="h-full w-auto max-w-full rounded-xl border-2 border-white/10 shadow-2xl object-contain bg-black/20"
                alt="Question"
              />
            </div>
          )}

          <div
            className={`${hasText && hasImage ? "w-1/2" : "w-full max-w-4xl"} grid grid-cols-2 gap-4`}
          >
            {options.map((opt, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={getOptionClass(index)}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl flex-shrink-0 
                  ${isLocked && index === selectedIndex ? "bg-black text-yellow-50" : "bg-yellow-500 text-black"}`}
                >
                  {OPTION_LABELS[index]}
                </div>
                <div className="flex flex-col items-start gap-2">
                  {opt.text && (
                    <span className="text-lg font-bold text-left tracking-tight leading-tight">
                      {opt.text}
                    </span>
                  )}
                  {opt.image && (
                    <img
                      src={opt.image}
                      className="max-h-20 rounded border border-white/20"
                      alt="Option"
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 h-24 shrink-0 flex justify-between items-end">
        <div className="scale-90 origin-bottom-left -ml-2 shadow-2xl">
          <CircularTimer
            timers={config.timers}
            paused={isLocked || showResult}
          />
        </div>

        <button
          onClick={() => nextInRound()}
          className="group flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-yellow-500/20 border border-white/10 hover:border-yellow-500 rounded-2xl transition-all duration-300 mb-2"
        >
          <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black shadow-lg">
            <ChevronRight size={28} />
          </div>
          <span className="text-[10px] font-black uppercase text-yellow-500 tracking-tighter">
            Next Question
          </span>
        </button>
      </div>

      {/* RESULT DIALOG */}
      {showResult && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 animate-in fade-in duration-200">
          <div className="bg-slate-950 rounded-[2rem] p-10 text-center border-2 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.3)] animate-in zoom-in duration-300 max-w-md w-full">
            <div className="mb-6 p-4 rounded-full bg-green-500/20 text-green-500 inline-block">
              <Trophy size={64} />
            </div>
            <h2 className="text-5xl font-black uppercase mb-6 tracking-tighter text-green-400">
              Correct!
            </h2>
            <div className="w-full bg-white/5 border-y-4 border-green-500 py-6 mb-8">
              <p className="text-white text-3xl font-bold">
                {options[answer].text}
              </p>
            </div>
            <button
              onClick={() => nextInRound()}
              className="w-full py-4 bg-green-600 text-white rounded-xl font-black uppercase tracking-widest"
            >
              Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
