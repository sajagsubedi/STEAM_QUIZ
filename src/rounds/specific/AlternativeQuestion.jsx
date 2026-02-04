import { useState, useRef, useEffect } from "react";
import CircularTimer from "../../components/CicrcularTimer";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";
import { ROUND_CONFIGS } from "../../constants/roundConfig";

const OPTION_LABELS = ["A", "B", "C", "D"];

export const AlternativeQuestion = () => {
  const { selectedQuestion } = useNavigationStore();

  const [showAnswer, setShowAnswer] = useState(false);
  const [hasCorrect, setHasCorrect] = useState(false);
  const [wrongOptions, setWrongOptions] = useState([]);
  const audioRef = useRef(new Audio());

  const data = QUESTIONS.alternative.find(
    (item) => item.id === selectedQuestion,
  );

  if (!data) return null;

  const { media, options, answer, text } = data;
  const config = ROUND_CONFIGS["alternative"];

  const hasImage = media?.type === "image";
  const hasText = Boolean(text);

  // Initialize audio
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = "/questions/av/kbc-right-answer.mp3";
    audio.volume = 1;
    audio.preload = "auto";
  }, []);

  // Play sound when correct answer is selected
  useEffect(() => {
    if (hasCorrect) {
      const audio = new Audio("/questions/av/kbc-right-answer.mp3");
      audio.volume = 1;
      audio.play().catch(err => console.error("Audio playback failed:", err));
    }
  }, [hasCorrect]);

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

  const handleSelect = (index) => {
    if (hasCorrect || wrongOptions.includes(index)) return;

    if (index === answer) {
      setHasCorrect(true);
    } else {
      setWrongOptions([...wrongOptions, index]);
    }
  };

  const getOptionClass = (index) => {
    const base =
      "rounded-2xl p-6 flex gap-4 items-center border-4 text-lg font-semibold transition-all cursor-pointer";

    if (hasCorrect && index === answer) {
      return `${base} bg-gradient-to-r from-green-400 to-green-500 border-yellow-400 text-white shadow-lg scale-105`;
    }

    if (wrongOptions.includes(index)) {
      return `${base} bg-gradient-to-r from-red-400 to-red-500 border-yellow-400 text-white shadow-lg`;
    }

    if (hasCorrect || wrongOptions.includes(index)) {
      return `${base} bg-gray-600 border-yellow-400 text-gray-300 opacity-50 cursor-not-allowed`;
    }

    return `${base} bg-gradient-to-r from-indigo-600 to-blue-600 border-yellow-400 text-white hover:shadow-xl hover:scale-105`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6 flex flex-col relative overflow-hidden">
      {/* Decorative circular patterns */}
      <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-400 rounded-full opacity-20"></div>
      <div className="absolute top-40 left-20 w-20 h-20 border-2 border-blue-400 rounded-full opacity-20"></div>
      <div className="absolute bottom-32 right-10 w-40 h-40 border-2 border-yellow-400 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-yellow-400 rounded-full opacity-20"></div>

      {/* HEADER */}
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
            <span className="text-4xl font-bold text-orange-600">{data.id}</span>
          </div>
        </div>
      </div>

      {/* CIRCULAR TIMER */}
      <div className="flex justify-center mb-8 relative z-10">
        <CircularTimer timers={config.timers} />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-center relative z-10 px-6">
        {/* TEXT */}
        {hasText && (
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 border-4 border-yellow-400 rounded-3xl px-12 py-8 shadow-2xl max-w-4xl text-center mb-12 mx-auto">
            <h2 className="text-2xl font-bold text-white leading-relaxed">
              {data.id}) {text}
            </h2>
          </div>
        )}

        {/* IMAGE - Above options */}
        {hasImage && (
          <div className="flex justify-center mb-12">
            <img
              src={media.src}
              alt="question"
              className="max-h-64 object-contain rounded-xl shadow-2xl"
            />
          </div>
        )}

        {/* OPTIONS */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
          {options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={hasCorrect || wrongOptions.includes(index)}
              className={getOptionClass(index)}
            >
              <div className="w-12 h-12 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center font-bold text-xl shadow-lg flex-shrink-0">
                {OPTION_LABELS[index]}
              </div>

              <div className="flex flex-col gap-2 text-left">
                {opt.text && <span className="font-semibold">{opt.text}</span>}
                {opt.image && (
                  <img
                    src={opt.image}
                    alt="option"
                    className="max-h-20 object-contain rounded"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ANSWER SECTION - Show when correct selected */}
      {hasCorrect && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 max-w-2xl text-center shadow-2xl border-4 border-yellow-400">
            <div className="px-12 py-3 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full text-white text-3xl font-bold shadow-lg mb-8 inline-block">
              ANSWER
            </div>

            <h1 className="text-5xl font-bold text-white mb-8 drop-shadow-lg">
              Congratulations
            </h1>

            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 border-4 border-yellow-400 rounded-2xl px-8 py-6 mb-8 shadow-2xl">
              <p className="text-white text-2xl font-semibold">
                {data.options[answer].text}
              </p>
            </div>

            <button 
              onClick={playCorrectSound}
              className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg cursor-pointer hover:bg-yellow-500 transition-all transform hover:scale-110 active:scale-95 mx-auto"
              type="button"
            >
              <svg
                className="w-10 h-10 text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.172a1 1 0 011.414 0A6.972 6.972 0 0118 10a6.972 6.972 0 01-1.929 4.828 1 1 0 01-1.414-1.414A4.972 4.972 0 0016 10a4.972 4.972 0 00-1.343-3.536 1 1 0 010-1.414zm-1.414 1.414a1 1 0 011.414 0A4.972 4.972 0 0116 10a4.972 4.972 0 01-1.343 3.536 1 1 0 11-1.414-1.414A2.972 2.972 0 0014 10a2.972 2.972 0 00-.757-2.024 1 1 0 010-1.414z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
