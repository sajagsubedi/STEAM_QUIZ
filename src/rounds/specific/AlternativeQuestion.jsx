import React, { useState, useRef, useEffect } from "react";
import CircularTimer from "../../components/CircularTimer";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";
import { ROUND_CONFIGS } from "../../constants/roundConfig";
import { ChevronRight, Hash } from "lucide-react";

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

  const stopAllAudio = () => {
    Object.values(audioRef.current).forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  };

  const handleSelect = (index) => {
    if (isLocked || showResult || wrongOptions.includes(index)) return;

    setSelectedIndex(index);
    setIsLocked(true);

    // 1. Play Locking Sound
    stopAllAudio();
    audioRef.current.lock.play().catch(() => {});

    // 2. Suspense Phase (2 seconds)
    setTimeout(() => {
      stopAllAudio();

      if (index === currentQuestion.answer) {
        // 3a. Correct Sequence
        audioRef.current.right.play().catch(() => {});
        setShowResult(true);
      } else {
        // 3b. Wrong Sequence
        audioRef.current.wrong.play().catch(() => {});
        setWrongOptions((prev) => [...prev, index]);

        // Reset state so user can try again, but keep the red highlight
        setTimeout(() => {
          setIsLocked(false);
          setSelectedIndex(null);
        }, 1000);
      }
    }, 2000);
  };

  const getOptionClass = (index) => {
    const base =
      "relative overflow-hidden rounded-xl p-4 flex gap-4 items-center border-2 transition-all duration-300 shadow-xl min-h-[80px] w-full";

    // Correct Answer (revealed after lock)
    if (showResult && index === currentQuestion.answer) {
      return `${base} bg-green-600 border-green-300 text-white scale-105 z-10 shadow-green-500/50 ring-4 ring-green-400/20`;
    }

    // Wrong Selection (red)
    if (wrongOptions.includes(index)) {
      return `${base} bg-red-600 border-red-400 text-white shadow-red-500/50 opacity-90`;
    }

    // Currently Locking (Yellow Pulse)
    if (isLocked && index === selectedIndex) {
      return `${base} bg-yellow-500 border-white text-black animate-pulse scale-105 z-10`;
    }

    // Disabled while waiting
    if (isLocked || showResult) {
      return `${base} bg-purple-950/20 border-white/5 text-white/20 cursor-not-allowed grayscale`;
    }

    // Default
    return `${base} bg-purple-900/40 border-purple-400/30 text-white hover:border-yellow-400 hover:bg-purple-800/60 cursor-pointer group hover:scale-[1.02]`;
  };

  if (!currentQuestion) return null;
  const { media, options, text } = currentQuestion;

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden bg-linear-to-br from-gray-900 via-purple-900 to-black relative p-4 md:p-6">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* HEADER WITH BADGES */}
      <div className="relative z-10 flex flex-col items-center shrink-0 mb-4">
        <div className="px-10 py-2 bg-linear-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full text-black text-sm font-black uppercase tracking-[0.3em] shadow-lg border-b-2 border-yellow-800 mb-2">
          {config.title}
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1 rounded-full backdrop-blur-sm">
          <Hash className="text-yellow-500" size={12} />
          <span className="text-white font-black text-xs uppercase tracking-tighter">
            Q_ID_{selectedQuestion}
          </span>
        </div>
      </div>

      {/* MAIN CONTENT Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-0 px-4">
        {text && (
          <div className="w-full max-w-5xl bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-8 shadow-2xl">
            <h2 className="text-white font-black text-center text-2xl leading-tight tracking-tight">
              {text}
            </h2>
          </div>
        )}

        <div
          className={`w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8`}
        >
          {media?.src && (
            <div className="w-full lg:w-1/2 flex justify-center max-h-[35vh]">
              <img
                src={media.src}
                className="h-full w-auto max-w-full rounded-xl border border-white/10 shadow-2xl object-contain bg-black/40 p-2"
                alt="Question"
              />
            </div>
          )}

          <div
            className={`w-full ${media?.src ? "lg:w-1/2" : "w-full"} grid grid-cols-1 md:grid-cols-2 gap-4`}
          >
            {options.map((opt, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={getOptionClass(index)}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl flex-shrink-0 shadow-inner
                  ${isLocked && index === selectedIndex ? "bg-black text-yellow-500" : "bg-yellow-500 text-black"}`}
                >
                  {OPTION_LABELS[index]}
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-lg font-bold text-left leading-tight">
                    {opt.text}
                  </span>
                  {opt.image && (
                    <img
                      src={opt.image}
                      className="max-h-20 rounded border border-white/10 mt-1"
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
      <div className="relative z-10 h-24 shrink-0 flex justify-between items-end px-4">
        <div className="scale-75 md:scale-90 origin-bottom-left shadow-2xl">
          <CircularTimer
            timers={config.timers}
            paused={isLocked || showResult}
          />
        </div>

        <button
          onClick={() => nextInRound()}
          className="group flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-yellow-500/20 border border-white/10 hover:border-yellow-500 rounded-2xl transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition-transform">
            <ChevronRight size={24} />
          </div>
          <span className="text-[9px] font-black uppercase text-yellow-500 tracking-tighter">
            Next Mission
          </span>
        </button>
      </div>
    </div>
  );
};
