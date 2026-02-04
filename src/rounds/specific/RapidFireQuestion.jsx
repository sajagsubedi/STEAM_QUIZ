import { useState, useEffect } from "react";
import CircularTimer from "../../components/CircularTimer";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";
import { ROUND_CONFIGS } from "../../constants/roundConfig";

export const RapidFireQuestion = () => {
  const { selectedQuestion, nextInRound } = useNavigationStore();
  const [visibleCount, setVisibleCount] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  const setData = QUESTIONS.rapidFire?.find((set) => set.setId === selectedQuestion);
  const questions = setData?.questions || [];
  const total = questions.length;
  const config = ROUND_CONFIGS.rapidFire;

  const showQuestions = () => {
    if (visibleCount < total) setVisibleCount((prev) => prev + 1);
  };

  // Keyboard shortcut for Next button (N key)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === 'n') {
        nextInRound();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextInRound]);

  if (!setData || total === 0) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-blue-400 font-mono italic">
        [ SYSTEM ERROR: DATA_NOT_FOUND ]
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden bg-linear-to-br from-gray-900 via-blue-900 to-black relative p-6">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      {/* HEADER SECTION */}
      <div className="relative z-10 w-full flex justify-between items-center mb-4">
        <div className="px-6 py-2 bg-linear-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full text-black text-sm font-black uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(234,179,8,0.3)] border-b-2 border-yellow-800">
          {config.title}
        </div>
        <div className="text-blue-400 font-mono text-xs tracking-widest animate-pulse bg-blue-900/20 px-4 py-1 rounded-full border border-blue-500/30">
          SYSTEM: {visibleCount}/{total} LOADED
        </div>
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        
        {/* QUESTIONS GRID AREA */}
        <div className={`flex-1 overflow-y-auto pr-2 mb-4 transition-all duration-500 custom-scrollbar`}>
          <div className="grid grid-cols-2 gap-3">
            {questions.map((item, index) => {
              const isVisible = index < visibleCount;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-500
                    ${isVisible 
                      ? "bg-blue-600/10 border-blue-400/40 opacity-100" 
                      : "bg-white/5 border-white/5 opacity-20"}
                  `}
                >
                  <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center font-black text-sm rounded-lg transition-colors
                    ${isVisible ? "bg-yellow-500 text-black shadow-[0_0_10px_rgba(234,179,8,0.4)]" : "bg-gray-800 text-gray-500"}
                  `}>
                    {index + 1}
                  </div>
                  <div className="flex-1 text-sm md:text-base font-medium text-blue-50 leading-tight">
                    {isVisible ? item.text : "••••••••••••••••••••"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ANSWERS SECTION */}
        {showAnswers && (
          <div className="bg-black/60 backdrop-blur-md border border-yellow-500/30 p-4 rounded-2xl shadow-2xl animate-slide-up max-h-[35%] overflow-y-auto custom-scrollbar w-4/5 self-center">
            <div className="flex items-center gap-2 mb-3 sticky top-0 bg-black/10 py-1">
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-ping" />
              <h3 className="text-yellow-500 font-black uppercase tracking-widest text-xs">Answer Decryption</h3>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {questions.map((item, index) => (
                <div key={index} className="text-[11px] leading-tight text-blue-100 bg-white/5 p-2 rounded-lg border border-white/5">
                  <span className="text-yellow-500 font-bold mr-1">{index + 1}.</span> 
                  {item.answer}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER CONTROLS */}
      <div className="relative z-10 w-full flex justify-between items-end mt-4">
        {/* TIMER */}
        <div className="scale-90 origin-bottom-left">
          <CircularTimer
            timers={config.timers}
            nextFunction={visibleCount >= total ? undefined : showQuestions}
          />
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="text-white/20 text-[8px] tracking-[0.8em] uppercase font-light mr-2">
            Control Terminal
          </div>
          
          <div className="flex gap-3">
            {/* REVEAL ANSWERS BUTTON */}
            <button
              onClick={() => setShowAnswers(true)}
              className="group relative px-6 py-2.5 bg-blue-900/40 hover:bg-blue-800/60 text-blue-200 text-xs font-black uppercase tracking-widest rounded-xl transition-all border border-blue-500/30 active:translate-y-1"
            >
              <span className="relative z-10">Reveal Answers</span>
            </button>

            {/* NEXT BUTTON */}
            <button
              onClick={nextInRound}
              className="group relative px-8 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(234,179,8,0.4)] border-b-4 border-yellow-700 active:border-b-0 active:translate-y-1 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Next Round
                <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-black/10 rounded border border-black/10">N</kbd>
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }
        .animate-slide-up {
          animation: slideUp 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};