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

  const data = QUESTIONS.alternative.find(
    (item) => item.id === selectedQuestion,
  );

  if (!data) return null;

  const { media, options, answer, text } = data;
  const config = ROUND_CONFIGS["alternative"];

  const hasImage = media?.type === "image";
  const hasText = Boolean(text);

  const handleSelect = (index) => {
    if (hasCorrect) return;

    if (index === answer) {
      setHasCorrect(true);
    } else if (!wrongOptions.includes(index)) {
      setWrongOptions([...wrongOptions, index]);
    }
  };

  const getOptionClass = (index) => {
    const base =
      "rounded-xl p-5 flex gap-4 items-center border-2 text-lg font-semibold transition-all";

    if ((showAnswer || hasCorrect) && index === answer) {
      return `${base} bg-green-100 border-green-500 text-green-700`;
    }

    if (wrongOptions.includes(index)) {
      return `${base} bg-red-100 border-red-500 text-red-700`;
    }

    return `${base} bg-white border-gray-300 hover:bg-indigo-50`;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-200 via-purple-200 to-sky-400 p-6 flex flex-col relative">
      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-center">
          <div className="px-6 py-3 bg-rose-400 rounded-full text-2xl font-bold text-white shadow">
            {config.title}
          </div>
        </div>

        <button
          className="self-start bg-sky-500 px-4 py-2 text-lg rounded text-white"
          onClick={() => setShowQuestion(true)}
        >
          Question
        </button>
      </div>
      <div className="w-full h-[60vh] p-6">
        {/* CONTENT */}
        {showQuestion && (
          <div className="flex-1 flex flex-col justify-center">
            {/* TEXT */}
            {hasText && (
              <h2 className="text-2xl font-semibold text-justify mb-6 text-gray-800">
                {data.id}) {text}
              </h2>
            )}

            {/* ONLY IMAGE (MAIN QUESTION) */}
            {!hasText && hasImage && (
              <>
                <div className="w-full flex justify-center mb-10">
                  <img
                    src={media.src}
                    alt="question"
                    className="max-h-[55vh] object-contain rounded-xl shadow-lg"
                  />
                </div>

                {/* OPTIONS BELOW IMAGE */}
                <div className="grid grid-cols-2 gap-6 w-4/5 mx-auto">
                  {options.map((opt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelect(index)}
                      disabled={hasCorrect || wrongOptions.includes(index)}
                      className={getOptionClass(index)}
                    >
                      <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold">
                        {OPTION_LABELS[index]}
                      </div>

                      <div className="flex items-center gap-2">
                        {opt.text && <span>{opt.text}</span>}
                        {opt.image && (
                          <img
                            src={opt.image}
                            alt="option"
                            className="max-h-24 object-contain rounded"
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* TEXT + IMAGE */}
            {hasText && hasImage && (
              <div className="flex gap-8 items-center">
                {/* OPTIONS */}
                <div className="w-[60%] flex flex-col gap-6">
                  {options.map((opt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelect(index)}
                      disabled={hasCorrect || wrongOptions.includes(index)}
                      className={getOptionClass(index)}
                    >
                      <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold">
                        {OPTION_LABELS[index]}
                      </div>

                      <div className="flex flex-col gap-2">
                        {opt.text && <span>{opt.text}</span>}
                        {opt.image && (
                          <img
                            src={opt.image}
                            alt="option"
                            className="max-h-24 object-contain rounded"
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* IMAGE */}
                <div className="w-[40%] flex justify-center">
                  <img
                    src={media.src}
                    alt="question"
                    className="max-h-[50vh] object-contain rounded-xl shadow-lg"
                  />
                </div>
              </div>
            )}

            {/* ONLY TEXT */}
            {hasText && !hasImage && (
              <div className="grid grid-cols-2 gap-6 w-4/5 mx-auto">
                {options.map((opt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    disabled={hasCorrect || wrongOptions.includes(index)}
                    className={getOptionClass(index)}
                  >
                    <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold">
                      {OPTION_LABELS[index]}
                    </div>

                    <div className="flex flex-col gap-2">
                      {opt.text && <span>{opt.text}</span>}
                      {opt.image && (
                        <img
                          src={opt.image}
                          alt="option"
                          className="max-h-24 object-contain rounded"
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ANSWER BUTTON */}
      <div className="h-[15vh] flex justify-end items-center">
        <button
          className="bg-pink-500 px-6 py-3 text-xl rounded text-white"
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
