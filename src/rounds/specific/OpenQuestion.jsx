import React, { useState } from "react";
import CircularTimer from "../../components/CircularTimer";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";
import { ROUND_CONFIGS } from "../../constants/roundConfig";
import { ChevronRight } from "lucide-react";

function OpenQuestionPage() {
  const { sequentialCount, nextInRound } = useNavigationStore();
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestion = QUESTIONS.open.find((q) => q.id === sequentialCount);
  const config = ROUND_CONFIGS["open"];

  const handleNextAction = () => {
    setShowAnswer(false);
    nextInRound();
  };

  if (!currentQuestion) return null;

  const hasMedia = !!currentQuestion.media?.src;

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden bg-linear-to-br from-gray-900 via-purple-900 to-black relative p-4 md:p-6">
      {/* HEADER */}
      <div className="relative z-10 flex justify-center items-center h-14 shrink-0">
        <div className="px-6 py-1.5 bg-linear-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full text-black text-xs font-black uppercase tracking-widest shadow-lg">
          {config.title}
        </div>
        <div className="absolute right-0 w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-black font-black text-lg transform rotate-3 shadow-lg -translate-x-[105%]">
          {currentQuestion.id}
        </div>
      </div>

      {/* NEXT BUTTON */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={handleNextAction}
          className="group flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-yellow-500/20 border border-white/10 hover:border-yellow-500 rounded-2xl transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition-transform">
            <ChevronRight size={28} />
          </div>
          <span className="text-[10px] font-black uppercase text-yellow-500">
            Next
          </span>
        </button>
      </div>

      {/* MAIN QUESTION */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-0 py-4 pr-24">
        <div
          className={`w-full max-w-4xl flex flex-col items-center ${hasMedia ? "gap-4" : "gap-8"}`}
        >
          <div
            className={`w-full bg-purple-900/40 backdrop-blur-md border-2 border-yellow-500 rounded-2xl shadow-2xl relative overflow-hidden ${hasMedia ? "p-6" : "p-10"}`}
          >
            <h2
              className={`text-white font-bold leading-tight text-center ${hasMedia ? "text-xl" : "text-3xl"}`}
            >
              {currentQuestion.text}
            </h2>
          </div>

          {hasMedia && (
            <div className="flex-1 min-h-0 flex justify-center items-center w-full max-h-[45vh]">
              <img
                src={currentQuestion.media.src}
                className="h-full w-auto max-w-full rounded-xl border-2 border-yellow-500/70 shadow-2xl object-contain"
                alt="Question"
              />
            </div>
          )}
        </div>
      </div>

      {/* ANSWER DIALOG */}
      {showAnswer && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-6">
          <div className="bg-purple-900/70 border-2 border-yellow-500 rounded-2xl shadow-2xl p-8 w-full text-center">
            <h2 className="text-yellow-400 text-base  mb-6">
              {currentQuestion.answer}
            </h2>
            <button
              onClick={handleNextAction}
              className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:scale-105 transition-transform shadow-lg"
            >
              Proceed to Next
            </button>
          </div>
        </div>
      )}

      {/* REVEAL ANSWER BUTTON */}
      {!showAnswer && (
        <div className="absolute right-6 bottom-28 z-20">
          <button
            onClick={() => setShowAnswer(true)}
            className="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border shadow-md bg-purple-900/40 border-purple-500/30 text-purple-200 hover:bg-purple-800/60 active:scale-95"
          >
            Reveal Answer
          </button>
        </div>
      )}

      {/* FOOTER TIMER */}
      <div className="relative z-10 h-24 shrink-0 flex justify-start items-end">
        <div className="scale-75 origin-bottom-left -ml-2">
          <CircularTimer timers={config.timers} paused={false} />
        </div>
      </div>
    </div>
  );
}

/* Wrapper */
export function OpenQuestion() {
  const { sequentialCount } = useNavigationStore();
  return <OpenQuestionPage key={sequentialCount} />;
}
