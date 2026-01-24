import { useState } from "react";
import CircularTimer from "../../components/CicrcularTimer";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";
import { ROUND_CONFIGS } from "../../constants/roundConfig";

export const RapidFireQuestion = () => {
  const { selectedQuestion } = useNavigationStore();

  const [visibleCount, setVisibleCount] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  const setData = QUESTIONS.rapidFire?.find(
    (set) => set.setId === selectedQuestion,
  );

  const questions = setData?.questions || [];
  const total = questions.length;
  const config = ROUND_CONFIGS.rapidFire;
  console.log(config);

  const showQuestions = () => {
    // 2nd+ Enter → reveal questions one by one
    if (visibleCount == total) {
      return undefined;
    }

    setVisibleCount((prev) => prev + 1);
  };

  if (!setData || total === 0) {
    return (
      <div className="min-h-screen bg-linear-to-b from-pink-200 via-purple-200 to-sky-400 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-700">
          No Rapid Fire questions found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-200 via-purple-200 to-sky-400 p-6 flex flex-col relative">
      {/* HEADER */}
      <div className="flex justify-center mb-6">
        <div className="px-8 py-3 bg-rose-400 rounded-full text-2xl font-bold text-white uppercase shadow">
          Rapid Fire Round
        </div>
      </div>

      {/* CONTENT AREA (Questions + Answers) */}
      <div className="flex-1 overflow-hidden flex flex-col gap-4">
        {/* QUESTIONS */}
        <div className=" pr-2 grid grid-cols-2 gap-5 h-max-[60vh]">
          {questions.map((item, index) => {
            const showQ = index < visibleCount;
            return (
              <div
                key={index}
                className="flex items-center gap-4 px-6 py-4 rounded-lg text-white bg-rose-500"
              >
                <div className="bg-black text-white w-10 h-10 flex items-center justify-center font-bold text-xl">
                  {index + 1}
                </div>

                <div className="flex-1 text-lg font-medium">
                  {showQ ? item.text : ""}
                </div>
              </div>
            );
          })}
        </div>

        {/* ANSWERS (inside same screen) */}
        {showAnswers && (
          <div className="bg-black text-white p-4 rounded-lg max-h-[25%] w-4/5  mx-auto overflow-auto">
            <div className="text-xl font-bold mb-3">Answers</div>
          <div className="text-lg flex  flex-wrap gap-5">

            {questions.map((item, index) => (
              <span>
                {index + 1}) {item.answer}
              </span>
            ))}
            </div>
          </div>
        )}
      </div>

      {/* ANSWER BUTTON */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setShowAnswers(true)}
          className="bg-pink-500 px-6 py-3 text-xl rounded text-white shadow"
        >
          Answer
        </button>
      </div>

      {/* TIMER */}

      <CircularTimer
        timers={config.timers}
        nextFunction={visibleCount >= total ? undefined : showQuestions}
      />
    </div>
  );
};
