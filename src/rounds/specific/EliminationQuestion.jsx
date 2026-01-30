import React, { useState } from "react";
import CircularTimer from "../../components/CicrcularTimer";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";
import { ROUND_CONFIGS } from "../../constants/roundConfig";

export function EliminationQuestion() {
    const { selectedQuestion, currentRound, currentSubjectId, } = useNavigationStore();
    const [showQuestion, setShowQuestion] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const currentQuestion = QUESTIONS[currentRound].find(
        (q) => q.subjectId == currentSubjectId
    ).questions.find((q => q.id == selectedQuestion));

    if (!currentQuestion) return null;
    const config = ROUND_CONFIGS[currentRound];

    return (
        <div className="min-h-screen bg-linear-to-b from-pink-200 via-purple-200 to-sky-400 p-6 flex flex-col relative">
            <div>
                <div className="flex justify-center w-full">
                    <div className="p-4 bg-rose-400 rounded-full text-2xl font-bold text-white uppercase">
                        {config.title}
                    </div>
                </div>
                <button
                    className="self-start bg-sky-500 p-2 text-xl rounded text-white"
                    onClick={() => setShowQuestion(true)}
                >
                    Question
                </button>
            </div>
            <div className="w-full h-[60vh] p-6">
                {showQuestion && (
                    currentQuestion.text ? (
                        <div className="flex flex-col h-full gap-4">
                            <h2 className="text-xl font-semibold">
                                {currentQuestion.text}
                            </h2>
                            {currentQuestion.media?.type === "image" && (
                                <div className="col-span-5 h-full flex justify-end items-start overflow-hidden">
                                    <img
                                        src={currentQuestion.media.src}
                                        alt="question"
                                        className="max-h-full w-auto object-contain"
                                    />
                                </div>
                            )}
                        </div>

                    ) : (
                        // Only image case
                        currentQuestion.media?.type === "image" && (
                            <div className="w-full h-full flex items-start justify-center overflow-hidden">
                                <img
                                    src={currentQuestion.media.src}
                                    alt="question"
                                    className="max-h-full h-auto w-full object-contain"
                                />
                            </div>
                        )
                    )
                )}
            </div>



            <div className="h-[20vh] w-full flex self-end justify-end">
                <div className="flex gap-5 items-center justify-center">
                    <div className={` ${showAnswer ? "visible" : "invisible"}  bg-green-600 rounded-tl-full  rounded-br-full p-4 text-white text-x font-semibold h-max flex items-center px-10 py-10`}>
                        {currentQuestion.answer}
                    </div>
                    <button
                        className=" bg-pink-500 p-2 px-5 text-xl rounded text-white"
                        onClick={() => setShowAnswer(true)}
                    >
                        Answer
                    </button>
                </div>
            </div>
            <CircularTimer timers={config.timers} />
        </div>
    );
}
