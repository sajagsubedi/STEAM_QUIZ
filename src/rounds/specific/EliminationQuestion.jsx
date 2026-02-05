import React, { useState, useEffect, useRef, useMemo } from "react";
import CircularTimer from "../../components/CircularTimer";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";
import { ROUND_CONFIGS } from "../../constants/roundConfig";
import { ArrowLeft, XCircle, Trophy, ChevronRight } from "lucide-react";

export function EliminationQuestion() {
  const {
    selectedQuestion,
    currentRound,
    currentSubjectId,
    nextInRound,
    goToSubSelection,
  } = useNavigationStore();
  const [showDialog, setShowDialog] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

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

  // Initialize Audio and Preload
  useEffect(() => {
    correctAudio.current = new Audio("/sounds/kbc-right-answer.mp3");
    wrongAudio.current = new Audio("/sounds/kbc-wrong-answer.mp3");

    correctAudio.current.preload = "auto";
    wrongAudio.current.preload = "auto";

    return () => stopAllAudio();
  }, []);

  const subjectData = QUESTIONS[currentRound]?.find(
    (s) => String(s.subjectId) === String(currentSubjectId),
  );
  const currentQuestion = subjectData?.questions.find(
    (q) => String(q.id) === String(selectedQuestion),
  );
  const config = ROUND_CONFIGS[currentRound];

  const confettiParticles = useMemo(() => {
    if (!showDialog || !isCorrect) return [];
    return [...Array(35)].map((_, i) => ({
      id: i,
      // eslint-disable-next-line react-hooks/purity
      left: Math.random() * 100,
      // eslint-disable-next-line react-hooks/purity
      delay: Math.random() * 2,
      // eslint-disable-next-line react-hooks/purity
      duration: Math.random() * 2 + 2,
      // eslint-disable-next-line react-hooks/purity
      width: Math.random() * 8 + 4,
      // eslint-disable-next-line react-hooks/purity
      height: Math.random() * 12 + 4,
      color: ["#FFD700", "#00FF00", "#00BFFF", "#FF4500", "#FF1493"][
        // eslint-disable-next-line react-hooks/purity
        Math.floor(Math.random() * 5)
      ],
    }));
  }, [showDialog, isCorrect]);

  const handleValidation = (status) => {
    if (showDialog || !currentQuestion) return;

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
  }, [showDialog, currentQuestion]);

  if (!currentQuestion) return null;
  const hasMedia = !!currentQuestion.media?.src;

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden bg-linear-to-br from-gray-900 via-purple-900 to-black relative p-4 md:p-6">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* HEADER */}
      <div className="relative z-10 flex justify-between items-center h-14 shrink-0">
        <button
          onClick={() => {
            stopAllAudio();
            goToSubSelection();
          }}
          className="bg-white/5 p-2 rounded-full border border-white/10 hover:border-yellow-500 text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="px-6 py-1.5 bg-linear-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full text-black text-xs font-black uppercase tracking-widest shadow-lg">
          {config?.title || "Elimination Round"}
        </div>
        <div className="flex items-center gap-3 -translate-x-[50%]">
          <p className="hidden md:block text-[10px] text-yellow-500 font-mono uppercase font-bold">
            {subjectData?.subjectName}
          </p>
          <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-black font-black text-lg transform rotate-3">
            {currentQuestion.id}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-0 py-4">
        <div
          className={`w-full max-w-5xl flex flex-col items-center ${hasMedia ? "gap-4" : "gap-8"}`}
        >
          <div className="w-full bg-purple-900/40 backdrop-blur-md border-2 border-yellow-500 rounded-2xl shadow-2xl p-6 md:p-10 relative overflow-hidden">
            <h2 className="text-white font-bold leading-tight text-center text-2xl md:text-4xl">
              {currentQuestion.text}
            </h2>
          </div>
          {hasMedia && (
            <div className="flex-1 min-h-0 flex justify-center items-center w-full max-h-[45vh]">
              <img
                src={currentQuestion.media.src}
                className="h-full w-auto max-w-full rounded-xl border-2 border-white/20 shadow-2xl object-contain"
                alt="Visual"
              />
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 h-24 shrink-0 flex justify-between items-end">
        <div className="scale-75 origin-bottom-left -ml-2">
          {/* PAUSE PASSED HERE */}
          <CircularTimer timers={config?.timers} paused={showDialog} />
        </div>
        <div className="flex gap-4 text-xs font-bold mb-2 uppercase">
          <div className="px-4 py-1.5 bg-green-500/20 border border-green-400 rounded-lg text-green-400 font-black">
            [C] Correct
          </div>
          <div className="px-4 py-1.5 bg-red-500/20 border border-red-400 rounded-lg text-red-400 font-black">
            [X] Incorrect
          </div>
        </div>
      </div>

      {/* RESULT OVERLAY */}
      {showDialog && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center animate-in fade-in duration-500 bg-black/60 backdrop-blur-2xl">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {isCorrect &&
              confettiParticles.map((p) => (
                <div
                  key={p.id}
                  className="absolute animate-confetti opacity-100"
                  style={{
                    left: `${p.left}%`,
                    top: `-10%`,
                    width: `${p.width}px`,
                    height: `${p.height}px`,
                    backgroundColor: p.color,
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.duration}s`,
                  }}
                />
              ))}
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-md animate-in zoom-in duration-300">
            <div
              className={`mb-6 p-5 rounded-full shadow-lg ${isCorrect ? "bg-green-500 text-white animate-bounce" : "bg-red-500 text-white"}`}
            >
              {isCorrect ? <Trophy size={40} /> : <XCircle size={40} />}
            </div>

            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-2">
              {isCorrect ? "Congratulations!" : "Sorry!"}
            </h1>

            <p
              className={`text-base font-bold uppercase tracking-widest mb-8 ${isCorrect ? "text-green-400" : "text-red-400"}`}
            >
              {isCorrect ? "Correct Answer" : "Incorrect Answer"}
            </p>

            <div
              className={`w-full bg-white/5 backdrop-blur-md border-y-4 py-6 mb-8 transition-colors duration-500 ${isCorrect ? "border-green-500" : "border-red-500"}`}
            >
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                {currentQuestion.answer}
              </h2>
            </div>

            <button
              onClick={() => {
                stopAllAudio();
                nextInRound();
              }}
              className={`group flex items-center gap-2 px-8 py-3 rounded-full font-black text-base uppercase tracking-wider transition-all shadow-xl active:scale-95 ${isCorrect ? "bg-green-600 text-white hover:bg-green-500" : "bg-red-600 text-white hover:bg-red-500"}`}
            >
              Next Question
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation-name: confetti;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
