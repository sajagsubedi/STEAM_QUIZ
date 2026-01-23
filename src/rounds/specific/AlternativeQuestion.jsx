import { useState } from "react";
import CircularTimer from "../../components/CicrcularTimer";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";
import { ROUND_CONFIGS } from "../../constants/roundConfig";

const OPTION_LABELS = ["A", "B", "C", "D"];

export const AlternativeQuestion = () => {
  const { selectedQuestion } = useNavigationStore();

  const [showQuestion, setShowQuestion] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasCorrect, setHasCorrect] = useState(false);
  const [wrongOptions, setWrongOptions] = useState([]);

  const question = QUESTIONS.alternative.find(
    (q) => q.id === selectedQuestion
  );

  if (!question) return null;

  const config = ROUND_CONFIGS["alternative"];

  const hasText = Boolean(question.text);
  const hasImage = question.media?.type === "image";

  const handleSelect = (opt) => {
    if (hasCorrect) return;

    if (opt === question.answer) {
      setHasCorrect(true);
    } else if (!wrongOptions.includes(opt)) {
      setWrongOptions([...wrongOptions, opt]);
    }
  };

  const getOptionClass = (opt) => {
    const base =
      "rounded-xl px-6 py-6 text-xl font-semibold transition-all border-2 flex items-center gap-4";

    if ((showAnswer || hasCorrect) && opt === question.answer) {
      return `${base} bg-green-100 border-green-500 text-green-700`;
    }

    if (wrongOptions.includes(opt)) {
      return `${base} bg-red-100 border-red-500 text-red-700`;
    }

    return `${base} bg-white border-gray-300 hover:bg-indigo-50 cursor-pointer`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 via-purple-200 to-sky-400 p-6 flex flex-col relative">

      {/* HEADER */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-center w-full">
          <div className="px-6 py-3 bg-rose-400 rounded-full text-2xl font-bold text-white uppercase shadow">
            Alternative Round
          </div>
        </div>

        <button
          className="self-start bg-sky-400 px-4 py-2 text-xl rounded text-white"
          onClick={() => setShowQuestion(true)}
        >
          Question
        </button>
      </div>

      {/* CONTENT */}
      <div className="w-full h-[60vh] p-6">
        {showQuestion && (
          <>
            {/* TEXT (if exists) */}
            {hasText && (
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                {question.text}
              </h2>
            )}

            {/* IMAGE ONLY */}
            {!hasText && hasImage && (
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <img
                  src={question.media.src}
                  alt="question"
                  className="max-h-full w-auto object-contain"
                />
              </div>
            )}

            {/* TEXT + IMAGE */}
            {hasText && hasImage && (
              <div className="grid grid-cols-5 gap-8 h-full">
                {/* OPTIONS */}
                <div className="col-span-3 flex flex-col gap-5 justify-center">
                  {question.options.map((opt, index) => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      className={getOptionClass(opt)}
                      disabled={wrongOptions.includes(opt) || hasCorrect}
                    >
                      <span className="font-bold text-gray-600">
                        {OPTION_LABELS[index]}.
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>

                {/* IMAGE */}
                <div className="col-span-2 flex items-center justify-center overflow-hidden">
                  <img
                    src={question.media.src}
                    alt="question"
                    className="max-h-full w-auto object-contain"
                  />
                </div>
              </div>
            )}

            {/* TEXT ONLY */}
            {hasText && !hasImage && (
              <div className="grid grid-cols-2 gap-6 w-4/5 mx-auto">
                {question.options.map((opt, index) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className={getOptionClass(opt)}
                    disabled={wrongOptions.includes(opt) || hasCorrect}
                  >
                    <span className="font-bold text-gray-600">
                      {OPTION_LABELS[index]}.
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ANSWER BUTTON */}
      <div className="h-[20vh] w-full flex justify-end items-center">
        <button
          className="bg-pink-400 px-6 py-3 text-xl rounded text-white"
          onClick={() => setShowAnswer(true)}
        >
          Answer
        </button>
      </div>

      {/* TIMER */}
      <CircularTimer timers={config.timers} nextFunction={undefined} />
    </div>
  );
};
