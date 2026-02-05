import { useState, useEffect } from "react";
import CircularTimer from "../../components/CircularTimer";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";
import { ROUND_CONFIGS } from "../../constants/roundConfig";

export const RapidFireQuestion = () => {
  const { selectedQuestion, nextInRound } = useNavigationStore();
  const [visibleCount, setVisibleCount] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  const setData = QUESTIONS.rapidFire?.find(
    (set) => set.setId === selectedQuestion,
  );
  const questions = setData?.questions || [];
  const total = questions.length;
  const config = ROUND_CONFIGS.rapidFire;

  const showQuestions = () => {
    if (visibleCount < total) setVisibleCount((prev) => prev + 1);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase();
      if (key === "n") nextInRound();
      if (key === " ") {
        e.preventDefault();
        showQuestions();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextInRound, visibleCount]);

  const doNothing = () => {
    console.log("Questions completed");
  };

  if (!setData || total === 0) return null;

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden bg-linear-to-br from-gray-900 via-purple-900 to-black relative py-6 px-2">
      {/* Background Decor */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* HEADER */}
      <div className="relative z-10 w-full flex flex-col items-center mb-4 shrink-0">
        <div className="px-8 py-2 bg-linear-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full text-black text-xs font-black uppercase tracking-[0.3em] shadow-lg border-b-2 border-yellow-800 mb-3">
          {config.title}
        </div>
        <div className="text-purple-400 font-mono text-[10px] tracking-widest bg-purple-900/30 px-4 py-1 rounded-full border border-purple-500/30 uppercase">
          Question Matrix: {visibleCount} / {total}
        </div>
      </div>

      {/* MAIN CONTENT AREA - Reserved heights to prevent shifting */}
      <div className="relative z-10 flex-1 flex flex-col items-center min-h-0 w-full max-w-full mx-auto px-4">
        {/* QUESTIONS GRID - Occupies the top available space */}
        <div className="w-full flex-1 flex flex-col justify-center mb-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {questions.map((item, index) => {
              const isVisible = index < visibleCount;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-500
                    ${
                      isVisible
                        ? "bg-purple-600/10 border-yellow-500/60 opacity-100 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                        : "bg-white/5 border-white/5 opacity-20"
                    }
                  `}
                >
                  <div
                    className={`w-9 h-9 flex-shrink-0 flex items-center justify-center font-black text-lg rounded-lg transition-all
                    ${isVisible ? "bg-yellow-500 text-black shadow-md scale-105" : "bg-gray-800 text-gray-500"}
                  `}
                  >
                    {index + 1}
                  </div>
                  <div
                    className={`flex-1 font-bold leading-tight transition-all
                    ${isVisible ? "text-lg text-purple-50" : "text-base text-transparent select-none"}
                  `}
                  >
                    {isVisible ? item.text : "••••••••••••••••••••"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ANSWERS SECTION - Occupies fixed bottom space to prevent content jumping */}
        <div className="w-full h-32 flex justify-end items-center pr-16 mb-2">
          <div
            className={`w-4/5 bg-slate-950/90 backdrop-blur-md border-t-2 border-yellow-500 p-3 rounded-2xl shadow-2xl transition-all duration-500
                ${showAnswers ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"}
            `}
          >
            <div className="grid grid-cols-3 gap-2">
              {questions.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-white/5 px-2 py-1.5 rounded-lg border border-white/5"
                >
                  <span className="text-yellow-500 font-black text-[9px] uppercase mb-0.5 tracking-tighter">
                    Ans {index + 1}
                  </span>
                  <span className="text-purple-100 text-sm font-bold tracking-tight truncate">
                    {item.answer}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 w-full flex justify-between items-center mt-2 px-8 shrink-0">
        <div className="scale-90 origin-bottom-left">
          <CircularTimer
            timers={config.timers}
            nextFunction={visibleCount >= total ? doNothing : showQuestions}
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowAnswers(true)}
            className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border shadow-md active:scale-95
              ${
                showAnswers
                  ? "bg-yellow-500 border-yellow-400 text-black"
                  : "bg-purple-900/40 border-purple-500/30 text-purple-200 hover:bg-purple-800/60"
              }
            `}
          >
            {showAnswers ? "Decryption Loaded" : "Reveal Decryption"}
          </button>

          <button
            onClick={nextInRound}
            className="px-7 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg border-b-4 border-yellow-700 active:border-b-0 active:translate-y-1"
          >
            Finish Round [N]
          </button>
        </div>
      </div>
    </div>
  );
};
