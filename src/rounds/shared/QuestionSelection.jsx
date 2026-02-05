import { LucideArrowLeft, CheckCircle2 } from "lucide-react";
import { ROUND_CONFIGS } from "../../constants/roundConfig";
import { useNavigationStore } from "../../store/useNavigation";

const getGridConfig = (total) => {
  if (total <= 4) return { width: "max-w-[450px]", text: "text-5xl" };
  if (total <= 6) return { width: "max-w-[650px]", text: "text-4xl" };
  if (total <= 12) return { width: "max-w-[800px]", text: "text-3xl" };
  if (total <= 24) return { width: "max-w-[950px]", text: "text-2xl" };
  return { width: "max-w-[1150px]", text: "text-xl" };
};

export const QuestionSelection = ({ roundConfig }) => {
  const {
    currentRound,
    selectedQuestion,
    answeredQuestions,
    selectQuestion,
    nextInRound,
    currentSubjectId,
    goToSubSelection,
  } = useNavigationStore();

  let currentAnsweredQuestions;
  if (currentRound === "elimination1" || currentRound === "elimination2") {
    currentAnsweredQuestions =
      answeredQuestions[currentRound]?.[currentSubjectId] || [];
  } else {
    currentAnsweredQuestions = answeredQuestions[currentRound] || [];
  }

  const totalItems =
    typeof roundConfig.sets === "number"
      ? roundConfig.sets
      : typeof roundConfig.questionsPerSubject === "number"
        ? roundConfig.questionsPerSubject
        : roundConfig.totalQuestions;

  const { width, text } = getGridConfig(totalItems);
  const config = ROUND_CONFIGS[currentRound];

  return (
    // Reduced horizontal padding from p-4 to px-1
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-between overflow-hidden bg-linear-to-br from-gray-900 via-blue-900 to-black relative px-1 py-4 pb-8">
      {/* Background Tech Elements */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Back Button */}
      {currentRound.startsWith("elimination") && (
        <button
          onClick={goToSubSelection}
          className="absolute left-4 top-6 z-50 group flex items-center gap-2"
        >
          <div className="bg-white/5 p-3 rounded-full border border-white/10 group-hover:border-yellow-500 transition-all shadow-lg backdrop-blur-md">
            <LucideArrowLeft
              className="text-white group-hover:text-yellow-400"
              size={20}
            />
          </div>
        </button>
      )}

      {/* HEADER SECTION */}
      <div className="relative z-10 flex flex-col items-center mt-2 text-center">
        <div className="px-8 py-2 bg-linear-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full text-black text-sm md:text-base font-black uppercase tracking-[0.3em] mb-3 shadow-[0_0_30px_rgba(234,179,8,0.4)] border-b-2 border-yellow-800">
          {config.title}
        </div>

        <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2 drop-shadow-md">
          {currentRound === "rapidFire"
            ? "Select a Data Set"
            : "Select a Mission Question"}
        </h2>

        <div className="bg-blue-600/20 px-6 py-1.5 rounded-full border border-yellow-500/30 backdrop-blur-md">
          <p className="text-yellow-500 font-mono tracking-[0.2em] uppercase text-[10px] font-black">
            COMPLETED: {currentAnsweredQuestions.length} / {totalItems}
          </p>
        </div>
      </div>

      {/* QUESTION SELECTION - Reduced gap from gap-4 to gap-2 (mobile) and gap-8 to gap-4 (md) */}
      <div
        className={`relative z-10 flex-1 flex flex-wrap items-center justify-center gap-3 mx-auto w-full px-2 ${width}`}
      >
        {Array.from({ length: totalItems }, (_, i) => i + 1).map((num) => {
          const isAnswered = currentAnsweredQuestions.includes(num);
          const isSelected = selectedQuestion === num;

          return (
            <button
              key={num}
              onClick={() => {
                selectQuestion(num);
                nextInRound();
              }}
              className="relative group flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            >
              {/* STAR CONTAINER */}
              <div className="relative w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className={`absolute inset-0 w-full h-full drop-shadow-2xl transition-all duration-500
                    ${
                      isAnswered
                        ? "fill-blue-900/60 stroke-blue-400 stroke-2"
                        : isSelected
                          ? "fill-yellow-500 stroke-white stroke-2"
                          : "fill-yellow-500/10 stroke-yellow-500 stroke-2 group-hover:fill-yellow-500/30 group-hover:drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]"
                    }
                  `}
                >
                  <path d="M50 2L63 38H100L70 60L81 98L50 75L19 98L30 60L0 38H37L50 2Z" />
                </svg>

                {/* NUMBERED BADGE */}
                <div
                  className={`
                  z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black transition-all duration-300 border-2
                  ${text}
                  ${
                    isAnswered
                      ? "bg-blue-950 border-blue-400 text-blue-300"
                      : "bg-black border-yellow-400 text-yellow-400 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]"
                  }
                `}
                >
                  {num}
                </div>

                {/* DONE INDICATOR */}
                {isAnswered && (
                  <div className="absolute -top-1 -right-1 z-20 bg-blue-500 text-white rounded-full p-0.5 shadow-lg border border-white/20">
                    <CheckCircle2 size={16} />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="relative z-10 flex flex-col items-center gap-1 mt-2">
        <div className="text-white/10 text-[8px] tracking-[1em] uppercase font-light pointer-events-none">
          Steam Quiz Systems
        </div>
      </div>
    </div>
  );
};
