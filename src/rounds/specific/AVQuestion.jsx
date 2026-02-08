import React, { useState, useEffect, useRef } from "react";
import CircularTimer from "../../components/CircularTimer";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";
import { ROUND_CONFIGS } from "../../constants/roundConfig";
import {
  Play,
  Eye,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Hash,
  ChevronRight,
} from "lucide-react";

export const AVQuestion = () => {
  const { selectedQuestion, nextInRound } = useNavigationStore();

  const [step, setStep] = useState("entry");
  const [showAnswer, setShowAnswer] = useState(false);
  const [dialog, setDialog] = useState(null);

  const question = QUESTIONS.av?.find((q) => q.id === selectedQuestion);
  const config = ROUND_CONFIGS["av"];

  const stopAllAudio = () => {
    [correctAudio, wrongAudio].forEach((ref) => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });
  };

  const correctAudio = useRef(null);
  const wrongAudio = useRef(null);

  useEffect(() => {
    correctAudio.current = new Audio("/sounds/kbc-right-answer.mp3");
    wrongAudio.current = new Audio("/sounds/kbc-wrong-answer.mp3");
    return () => stopAllAudio();
  }, []);

  const handleValidation = (status) => {
    if (dialog) return;
    stopAllAudio();
    const audio = status ? correctAudio.current : wrongAudio.current;
    if (audio) {
      // eslint-disable-next-line react-hooks/immutability
      audio.currentTime = 0;
      audio.play().catch((err) => console.error("Audio blocked:", err));
    }
    setDialog({
      type: status ? "C" : "X",
      title: status ? "Correct!" : "Incorrect!",
      isCorrect: status,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (dialog) {
        if (key === "escape") setDialog(null);
        return;
      }
      if (key === "c") handleValidation(true);
      if (key === "x") handleValidation(false);
      if (key === "n" && step === "question") {
        stopAllAudio();
        nextInRound();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, nextInRound, dialog]);

  if (!question) return null;

  // Reusable Header Component for all steps
  const PageHeader = () => (
    <div className="relative z-10 flex flex-col items-center shrink-0 mb-6 w-full">
      <div className="px-10 py-2 bg-linear-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full text-black text-sm font-black uppercase tracking-[0.3em] shadow-lg border-b-2 border-yellow-800 mb-2">
        A/V ROUND
      </div>
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1 rounded-full backdrop-blur-sm">
        <Hash className="text-yellow-500" size={12} />
        <span className="text-white font-black text-xs uppercase tracking-tighter">
          File_Ref_{selectedQuestion}
        </span>
      </div>
    </div>
  );

  const renderMedia = (autoPlay = false) => {
    if (!question.media) return null;
    const { type, src } = question.media;
    const commonClass =
      "max-h-full max-w-full object-contain rounded-xl shadow-2xl";
    if (type === "image")
      return <img src={src} alt="resource" className={commonClass} />;
    if (type === "video")
      return (
        <video src={src} controls autoPlay={autoPlay} className={commonClass} />
      );
    if (type === "audio")
      return (
        <audio
          src={src}
          controls
          autoPlay={autoPlay}
          className="w-full max-w-md"
        />
      );
    return null;
  };

  // --- STAGE 1: ENTRY ---
  if (step === "entry") {
    return (
      <div className="h-screen w-screen bg-black flex flex-col p-6 bg-linear-to-br from-gray-900 via-purple-900 to-black relative">
        <PageHeader />
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={() => setStep("observation")}
            className="group relative flex flex-col items-center gap-6 p-16 bg-purple-900/20 border border-white/10 rounded-3xl backdrop-blur-md hover:border-yellow-500/50 transition-all duration-500"
          >
            <div className="p-8 bg-yellow-500 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.3)] group-hover:scale-110 transition-transform">
              <Play size={48} className="text-black fill-black" />
            </div>
            <span className="text-white font-black uppercase tracking-[0.5em] text-xl">
              Initialize Resource
            </span>
          </button>
        </div>
      </div>
    );
  }

  // --- STAGE 2: OBSERVATION ---
  if (step === "observation") {
    return (
      <div className="h-screen w-screen bg-black flex flex-col p-6 bg-linear-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
        <PageHeader />
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-0">
          <div className="flex-1 flex items-center justify-center bg-purple-950/30 rounded-3xl border border-white/10 p-6 overflow-hidden w-full max-w-5xl shadow-inner">
            {renderMedia(true)}
          </div>
          <div className="mt-4 text-yellow-500 font-black uppercase tracking-[0.2em] animate-pulse text-lg bg-black/40 px-6 py-2 rounded-full border border-yellow-500/20">
            {question.msg || "Observe the media carefully"}
          </div>
        </div>
        <div className="relative z-10 flex justify-center mt-6">
          <button
            onClick={() => setStep("question")}
            className="group flex items-center gap-4 bg-yellow-500 text-black px-12 py-3 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-lg active:translate-y-1"
          >
            Go to Question
            <ArrowRight
              size={20}
              className="group-hover:translate-x-2 transition-transform"
            />
          </button>
        </div>
      </div>
    );
  }

  // --- STAGE 3: QUESTION ---
  return (
    <div className="h-screen w-screen bg-black flex flex-col p-6 bg-linear-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {dialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="relative w-full max-w-md p-1 bg-linear-to-b from-gray-700 to-gray-900 rounded-[2rem]">
            <div className="bg-slate-950 rounded-[1.9rem] p-10 text-center border border-white/5">
              <div className="flex flex-col items-center">
                <div
                  className={`mb-6 p-4 rounded-full ${dialog.isCorrect ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
                >
                  {dialog.isCorrect ? (
                    <CheckCircle2 size={64} />
                  ) : (
                    <XCircle size={64} />
                  )}
                </div>
                <h2
                  className={`text-5xl font-black uppercase mb-6 tracking-tighter ${dialog.isCorrect ? "text-green-400" : "text-red-500"}`}
                >
                  {dialog.title}
                </h2>
                <div
                  className={`w-full bg-white/5 border-y-4 border-${dialog.isCorrect ? "green" : "red"}-500 py-6 mb-8`}
                >
                  <p className="text-purple-300 uppercase text-[10px] tracking-widest mb-1">
                    Correct Answer
                  </p>
                  <p className="text-white text-3xl font-bold">
                    {question.answer}
                  </p>
                </div>

                <button
                  onClick={() => {
                    stopAllAudio();
                    nextInRound();
                  }}
                  className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                    dialog.isCorrect
                      ? "bg-green-600 text-white hover:bg-green-500"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Proceed to Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SKIP BUTTON */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={() => {
            stopAllAudio();
            nextInRound();
          }}
          className="group flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-yellow-500/20 border border-white/10 hover:border-yellow-500 rounded-2xl transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition-transform">
            <ChevronRight size={24} />
          </div>
          <span className="text-[9px] font-black uppercase text-yellow-500 tracking-tighter">
            Next / Skip
          </span>
        </button>
      </div>

      <PageHeader />

      <div className="relative z-10 flex-1 flex gap-10 items-center min-h-0 px-8 pr-28">
        <div className="w-3/5 space-y-6">
          <div className="flex items-start gap-4">
            <span className="text-yellow-500 font-black text-3xl opacity-20">
              {selectedQuestion})
            </span>
            <h2 className="text-3xl font-black text-white leading-tight tracking-tight">
              {question.text}
            </h2>
          </div>
          <div
            className={`transition-all duration-700 ${showAnswer ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-purple-900/20 border border-yellow-500/30 p-5 rounded-2xl inline-block shadow-2xl backdrop-blur-md">
              <p className="text-yellow-500 font-black text-[9px] uppercase tracking-[0.3em] mb-1">
                Decrypted Answer
              </p>
              <p className="text-white text-2xl font-bold tracking-tight">
                {question.answer}
              </p>
            </div>
          </div>
        </div>

        <div className="w-2/5 flex flex-col items-center">
          <div className="w-full aspect-video bg-black/40 border border-white/10 rounded-2xl overflow-hidden p-2 flex items-center justify-center shadow-2xl">
            {renderMedia(false)}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-between items-end mt-auto">
        <div className="scale-75 origin-bottom-left">
          <CircularTimer timers={config.timers} paused={!!dialog} />
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="flex gap-3">
            <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-[9px] font-black uppercase tracking-widest">
              [C] Correct
            </div>
            <div className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-[9px] font-black uppercase tracking-widest">
              [X] Incorrect
            </div>
          </div>
          <button
            onClick={() => setShowAnswer(true)}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all shadow-lg"
          >
            Reveal Answer
          </button>
        </div>
      </div>
    </div>
  );
};
