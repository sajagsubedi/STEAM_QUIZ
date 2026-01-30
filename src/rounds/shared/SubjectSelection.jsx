import React from "react";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";
import { ROUND_CONFIGS } from "../../constants/roundConfig";

const SubjectSelection = () => {
    const {
        currentRound,
        selectEliminationSubject,
        nextInRound,
    } = useNavigationStore();

    const subjects = QUESTIONS[currentRound];
    const config = ROUND_CONFIGS[currentRound]

    if (!subjects) return null;

    return (
        <div className="min-h-screen bg-linear-to-b from-pink-200 via-purple-200 to-sky-400 p-6 flex flex-col">

            {/* HEADER */}
            <div className="flex flex-col items-center gap-4 mb-8">
                <div className="px-6 py-3 bg-rose-400 rounded-full text-2xl font-bold text-white uppercase shadow-lg">
                    {config.title}
                </div>

                <h2 className="text-3xl font-bold text-gray-800">
                    {currentRound === "rapidFire" ? "Select a Set" : "Select a Question"}
                </h2>
            </div>


            {/* SUBJECT GRID */}
            <div className="flex-1 grid place-content-center">

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">

                    {subjects.map((subject) => (
                        <button
                            key={subject.subjectId}
                            onClick={() => {
                                selectEliminationSubject(subject.subjectId);
                                nextInRound();
                            }}
                            className="
                h-36 w-56 rounded-2xl
                bg-white text-pink-600 text-2xl font-bold
                shadow-lg transition-all duration-200
                flex items-center justify-center
               hover:scale-105 hover:bg-pink-100 p-3
              "
                        >
                            {subject.subjectName}
                        </button>
                    ))}

                </div>

            </div>

        </div>
    );
};

export { SubjectSelection };
