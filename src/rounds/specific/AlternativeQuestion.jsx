import { useState } from "react";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";

export const AlternativeQuestion = () => {
  const { selectedQuestion, nextInRound } = useNavigationStore();
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasCorrect, setHasCorrect] = useState(false);
  const [wrongOptions, setWrongOptions] = useState([]);
  const question = QUESTIONS.alternative.find((q) => q.id === selectedQuestion);

  if (!question) return null;

  const handleSelect = (opt) => {
    if (hasCorrect) return;
    if (opt === question.answer) {
      setSelectedOption(opt);
      setHasCorrect(true);
    } else if (!wrongOptions.includes(opt)) {
      setWrongOptions([...wrongOptions, opt]);
    }
  };

  const getOptionClass = (opt) => {
    const base = "border rounded-lg p-4 text-center transition cursor-pointer";
    if (hasCorrect && opt === question.answer)
      return base + " bg-green-100 border-green-400 text-green-700";
    if (wrongOptions.includes(opt))
      return base + " bg-red-100 border-red-400 text-red-700";
    return base + " hover:bg-indigo-50";
  };

  const isDisabled = (opt) =>
    wrongOptions.includes(opt) || (hasCorrect && opt !== question.answer);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-8 flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 max-w-4xl w-full">
          <div className="text-sm text-gray-500 mb-4">
            Question {selectedQuestion}
          </div>
          <h3 className="text-3xl font-bold mb-8">{question.text}</h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {question.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={getOptionClass(opt)}
                disabled={isDisabled(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            <button
              onClick={nextInRound}
              className="bg-gray-100 text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
