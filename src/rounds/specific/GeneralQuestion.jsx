import React, { useState, useEffect, useRef } from "react";
import CircularTimer from "../../components/CicrcularTimer";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";
import { ROUND_CONFIGS } from "../../constants/roundConfig";
import { ArrowLeft } from "lucide-react";

export function GeneralQuestion() {
  const { selectedQuestion, backToSelection } = useNavigationStore();
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const audioRef = useRef(new Audio());

  const currentQuestion = QUESTIONS.general.find(
    (q) => q.id === selectedQuestion
  );
  if (!currentQuestion) return null;
  const config = ROUND_CONFIGS["general"];

  // Function to play the correct answer sound
  const playCorrectSound = () => {
    try {
      const audio = new Audio("/questions/av/kbc-right-answer.mp3");
      audio.volume = 1;
      audio.muted = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => console.error("Play error:", error));
      }
    } catch (error) {
      console.error("Error creating audio:", error);
    }
  };

  // Initialize audio once
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = "/questions/av/kbc-right-answer.mp3";
    audio.volume = 1;
    audio.preload = "auto";
  }, []);

  // Play sound immediately when correct answer is pressed
  useEffect(() => {
    if (answered && isCorrect) {
      const audio = new Audio("/questions/av/kbc-right-answer.mp3");
      audio.volume = 1;
      audio.play().catch(err => console.error("Audio playback failed:", err));
    }
  }, [answered, isCorrect]);

  // Keyboard shortcuts for marking answers
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (answered) return; // Don't process if already answered
      
      if (e.key.toLowerCase() === 'c') {
        // Play sound immediately on key press
        const audio = new Audio("/questions/av/kbc-right-answer.mp3");
        audio.volume = 1;
        audio.play().catch(err => console.error("Audio playback failed:", err));
        setIsCorrect(true);
        setAnswered(true);
      } else if (e.key.toLowerCase() === 'x') {
        setIsCorrect(false);
        setAnswered(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [answered]);

  if (answered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Back Button - Fixed Position */}
        <button
          onClick={backToSelection}
          className="fixed top-8 left-8 p-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-2xl transition-all transform hover:scale-120 active:scale-95 z-50 hover:shadow-red-500/50"
          type="button"
          title="Back to question selection"
        >
          <ArrowLeft size={32} strokeWidth={3} />
        </button>

        {/* Animated Background Circles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-52 h-52 bg-purple-600 rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-400 rounded-full opacity-5 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Confetti particles background effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                width: Math.random() * 8 + 4 + "px",
                height: Math.random() * 8 + 4 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                backgroundColor: ["#ffbe0b", "#fb5607", "#ff006e", "#00f5ff"][
                  Math.floor(Math.random() * 4)
                ],
                opacity: Math.random() * 0.6 + 0.4,
                animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        {/* Answer Section */}
        <div className="relative z-10 text-center max-w-3xl">
          {/* Header Badge */}
          <div className="mb-12 animate-bounce">
            <div className="inline-block px-14 py-4 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full text-white text-4xl font-bold shadow-2xl">
              ✓ ANSWER
            </div>
          </div>

          {/* Congratulations/Result Text */}
          <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 mb-8 drop-shadow-2xl animate-pulse">
            {isCorrect ? "🎉 Congratulations! 🎉" : "❌ Incorrect"}
          </h1>

          {/* Answer Display Box with glow effect */}
          <div className="relative mb-12">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-purple-600 to-yellow-400 rounded-3xl blur opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-purple-600 to-indigo-700 border-4 border-yellow-400 rounded-3xl px-12 py-10 shadow-2xl">
              <p className="text-white text-3xl font-bold leading-relaxed">
                {currentQuestion.answer}
              </p>
            </div>
          </div>

          {/* Decorative Line */}
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-12"></div>

          {/* Bottom decorative elements */}
          <div className="mt-16 flex justify-center gap-8">
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: "0s" }}></div>
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-40px) translateX(-10px); }
            75% { transform: translateY(-20px) translateX(5px); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6 flex flex-col relative overflow-hidden">
      {/* Decorative circular patterns */}
      <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-400 rounded-full opacity-20"></div>
      <div className="absolute top-40 left-20 w-20 h-20 border-2 border-blue-400 rounded-full opacity-20"></div>
      <div className="absolute bottom-32 right-10 w-40 h-40 border-2 border-yellow-400 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-yellow-400 rounded-full opacity-20"></div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 relative z-10">
        {/* Round Title */}
        <div className="flex-1">
          <div className="inline-block px-8 py-3 bg-gradient-to-r from-green-400 to-purple-600 rounded-full text-white text-2xl font-bold shadow-lg">
            {config.title}
          </div>
        </div>

        {/* Question Number Badge */}
        <div className="relative">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg transform -rotate-12">
            <span className="text-4xl font-bold text-orange-600">{currentQuestion.id}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 py-8">
        {/* Circular Timer */}
        <div className="mb-12">
          <CircularTimer timers={config.timers} />
        </div>

        {/* Question Display Area */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 border-4 border-yellow-400 rounded-3xl px-12 py-8 shadow-2xl max-w-4xl text-center mb-12">
          <p className="text-white text-2xl font-bold leading-relaxed">
            {currentQuestion.text || "Question content"}
          </p>
        </div>

        {/* Media Display */}
        {currentQuestion.media?.type === "image" && (
          <div className="mb-12">
            <img
              src={currentQuestion.media.src}
              alt="question"
              className="max-h-48 w-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Button Area */}
      <div className="relative z-10 mt-8 text-center">
        <p className="text-white text-lg font-semibold">
          Press <span className="text-green-400 font-bold">C</span> for Correct or <span className="text-red-400 font-bold">X</span> for Incorrect
        </p>
      </div>
    </div>
  );
}
