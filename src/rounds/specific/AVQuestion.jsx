import React, { useState } from "react";
import CircularTimer from "../../components/CircularTimer";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";
import { ROUND_CONFIGS } from "../../constants/roundConfig";

export const AVQuestion = () => {

  const { selectedQuestion } = useNavigationStore();

  const [showResource, setShowResource] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const question = QUESTIONS.av?.find(
    (q) => q.id === selectedQuestion
  );

  if (!question) return null;

  const config = ROUND_CONFIGS["av"];

  const hasMedia = question.media?.type;
  const hasText = Boolean(question.text);

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-200 via-purple-200 to-sky-400 p-6 flex flex-col relative">

      {/* HEADER */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-center w-full">
          <div className="px-8 py-3 bg-rose-400 rounded-full text-2xl font-bold text-white uppercase shadow">
            {config.title}
          </div>
        </div>

        {/* CONTROL BUTTONS */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowResource(true)}
            className="bg-blue-500 px-4 py-2 text-xl rounded text-white"
          >
            Show Resource
          </button>

          <button
            onClick={() => setShowQuestion(true)}
            className="bg-sky-500 px-4 py-2 text-xl rounded text-white"
          >
            Question
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full h-[60vh] mt-4">

        {/* TEXT ONLY */}
        {showQuestion && hasText && !showResource && (
          <h2 className="text-3xl font-bold text-gray-800">
            {question.text}
          </h2>
        )}

        {/* QUESTION + RESOURCE */}
        {(showQuestion || showResource) && (
          <div className="grid grid-cols-5 gap-8 h-full max-h-[60vh]">

            {/* QUESTION AREA */}
            <div className="col-span-3 flex">
              {showQuestion && hasText && (
                <h2 className="text-3xl font-bold text-gray-800 ">
                  {selectedQuestion}) {question.text}
                </h2>
              )}
            </div>

            {/* RESOURCE AREA */}
            <div className="col-span-2 flex flex-col items-center justify-center 
                bg-black/20 rounded-xl p-4 
                h-full max-h-full overflow-hidden">

              {showResource && hasMedia && question.media.type === "image" && (
                <img
                  src={question.media.src}
                  alt="resource"
                  className="max-h-full max-w-full object-contain"
                />
              )}

              {showResource && hasMedia && question.media.type === "video" && (
                <video
                  src={question.media.src}
                  controls
                  autoPlay
                  className="max-h-full max-w-full object-contain"
                />
              )}

              {showResource && hasMedia && question.media.type === "audio" && (
                <audio
                  src={question.media.src}
                  controls
                  autoPlay
                  className="w-full"
                />
              )}

              {question.msg && (
                <p className="text-xl font-semibold text-center mt-2">
                  {question.msg}
                </p>
              )}

            </div>

          </div>
        )}
      </div>

      {/* ANSWER SECTION */}
      <div className="h-[20vh] w-full flex justify-end items-center gap-6">

        <div
          className={`${showAnswer ? "visible" : "invisible"
            } bg-green-600 rounded-tl-full rounded-br-full px-12 py-8 text-white text-xl font-semibold`}
        >
          {question.answer}
        </div>

        <button
          onClick={() => setShowAnswer(true)}
          className="bg-pink-500 px-6 py-3 text-xl rounded text-white"
        >
          Answer
        </button>
      </div>

      {/* TIMER */}
      <CircularTimer timers={config.timers} />

    </div>
  );
};
