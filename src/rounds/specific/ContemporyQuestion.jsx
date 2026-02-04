import React, { useState, useEffect, useRef } from "react";
import CircularTimer from "../../components/CircularTimer";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";
import { ROUND_CONFIGS } from "../../constants/roundConfig";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";

function ContemporyQuestionPage() {
  const { selectedQuestion, nextInRound } = useNavigationStore();
  const [showDialog, setShowDialog] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQuestion = QUESTIONS.contempory.find(
    (q) => q.id === selectedQuestion
  );
  const config = ROUND_CONFIGS["contempory"];

  // Audio Refs
  const correctAudio = useRef(null);
  const wrongAudio = useRef(null);

  const stopAllAudio = () => {
    [correctAudio, wrongAudio].forEach((ref) => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });
  };

  useEffect(() => {
    correctAudio.current = new Audio("/sounds/kbc-right-answer.mp3");
    wrongAudio.current = new Audio("/sounds/kbc-wrong-answer.mp3");
    correctAudio.current.preload = "auto";
    wrongAudio.current.preload = "auto";

    return () => stopAllAudio();
  }, []);

  const handleValidation = (status) => {
    if (showDialog) return;
    stopAllAudio();
    setIsCorrect(status);
    setShowDialog(true);

    const audio = status ? correctAudio.current : wrongAudio.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((err) => console.error("Audio blocked:", err));
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showDialog) return;
      const key = e.key.toLowerCase();
      if (key === "c") handleValidation(true);
      if (key === "x") handleValidation(false);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showDialog]);

  if (!currentQuestion) return null;
  const hasMedia = !!currentQuestion.media?.src;

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden bg-linear-to-br from-gray-900 via-blue-900 to-black relative p-4 md:p-6">
      {/* BACKGROUND GRID */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* TOP HEADER */}
      <div className="relative z-10 flex justify-center items-center h-14 shrink-0">
        <div className="px-6 py-1.5 bg-linear-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full text-black text-xs font-black uppercase tracking-widest shadow-lg">
          {config.title}
        </div>
        <div className="absolute right-0 w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-black font-black text-lg transform rotate-3 shadow-lg -translate-x-[105%]">
          {currentQuestion.id}
        </div>
      </div>

      {/* SKIP/NEXT BUTTON */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={() => {
            stopAllAudio();
            nextInRound();
          }}
          className="group flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-yellow-500/20 border border-white/10 hover:border-yellow-500 rounded-2xl transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition-transform">
            <ChevronRight size={28} />
          </div>
          <span className="text-[10px] font-black uppercase text-yellow-500 tracking-tighter">
            Next / Skip
          </span>
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-0 py-4 pr-24">
        <div className={`w-full max-w-4xl flex flex-col items-center ${hasMedia ? "gap-4" : "gap-8"}`}>
          <div className={`w-full bg-blue-900/40 backdrop-blur-md border-2 border-blue-400/30 rounded-2xl shadow-2xl relative overflow-hidden ${hasMedia ? "p-6" : "p-10"}`}>
            <h2 className={`text-white font-bold leading-tight text-center ${hasMedia ? "text-xl" : "text-3xl"}`}>
              {currentQuestion.text}
            </h2>
          </div>

          {hasMedia && (
            <div className="flex-1 min-h-0 flex justify-center items-center w-full max-h-[45vh]">
              <img
                src={currentQuestion.media.src}
                className="h-full w-auto max-w-full rounded-xl border-2 border-white/10 shadow-2xl object-contain"
                alt="Question"
              />
            </div>
          )}
        </div>
      </div>

      {/* FOOTER AREA */}
      <div className="relative z-10 h-24 shrink-0 flex justify-between items-end">
        <div className="scale-75 origin-bottom-left -ml-2">
          <CircularTimer timers={config.timers} paused={showDialog} />
        </div>

        <div className="flex gap-4 text-[10px] font-mono tracking-tighter uppercase mb-2">
          <div className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 font-black">
            [C] Correct
          </div>
          <div className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 font-black">
            [X] Incorrect
          </div>
        </div>
      </div>

      {/* RESULT DIALOG */}
      {showDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md p-1 bg-linear-to-b from-gray-700 to-gray-900 rounded-[2rem]">
            <div className="bg-slate-950 rounded-[1.9rem] p-10 text-center border border-white/5 animate-in zoom-in duration-300">
              <div className={`mx-auto mb-6 p-4 w-max rounded-full ${isCorrect ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                {isCorrect ? <CheckCircle2 size={64} /> : <XCircle size={64} />}
              </div>

              <h2 className={`text-5xl font-black uppercase mb-6 tracking-tighter ${isCorrect ? "text-green-400" : "text-red-500"}`}>
                {isCorrect ? "Correct!" : "Incorrect!"}
              </h2>

              <div className={`w-full bg-white/5 border-y-4 py-6 mb-8 ${isCorrect ? "border-green-500" : "border-red-500"}`}>
                <p className="text-blue-300 uppercase text-[10px] tracking-widest mb-1">Answer</p>
                <p className="text-white text-3xl font-bold">{currentQuestion.answer}</p>
              </div>

              <button
                onClick={() => {
                  stopAllAudio();
                  if (isCorrect) {
                    nextInRound();
                  } else {
                    setShowDialog(false);
                  }
                }}
                className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                  isCorrect ? "bg-green-600 text-white hover:bg-green-500" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {isCorrect ? "Proceed to Next" : "Dismiss"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Export with key mechanism for full remount/timer reset
export function ContemporyQuestion() {
  const { selectedQuestion } = useNavigationStore();
  return <ContemporyQuestionPage key={selectedQuestion} />;
}