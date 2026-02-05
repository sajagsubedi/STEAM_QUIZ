import { LucideArrowLeft, CheckCircle2, Home } from "lucide-react";
import { ROUND_CONFIGS } from "../../constants/roundConfig";
import { useNavigationStore } from "../../store/useNavigation";

const getGridConfig = (total) => {
  let cols = 4;
  if (total <= 4) cols = 2;
  else if (total <= 6) cols = 3;
  else if (total <= 12) cols = 4;
  else if (total <= 20) cols = 5;
  else if (total <= 24) cols = 6;
  else cols = 8;

  if (total <= 4) return { cols, width: "max-w-[450px]", text: "text-5xl" };
  if (total <= 8) return { cols, width: "max-w-[650px]", text: "text-4xl" };
  if (total <= 15) return { cols, width: "max-w-[850px]", text: "text-3xl" };
  if (total <= 24) return { cols, width: "max-w-[1000px]", text: "text-2xl" };
  return { cols, width: "max-w-[1200px]", text: "text-xl" };
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
    goToMenu, // Added goToMenu from store
  } = useNavigationStore();

  const currentAnsweredQuestions = currentRound.startsWith("elimination")
    ? answeredQuestions[currentRound]?.[currentSubjectId] || []
    : answeredQuestions[currentRound] || [];

  const totalItems =
    roundConfig.sets ??
    roundConfig.questionsPerSubject ??
    roundConfig.totalQuestions ??
    0;

  const { cols, width, text } = getGridConfig(totalItems);
  const config = ROUND_CONFIGS[currentRound];

  const isElimination = currentRound.startsWith("elimination");

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-between overflow-hidden bg-linear-to-br from-gray-900 via-purple-900 to-black relative px-1 py-4 pb-8">
      {/* Background Tech Elements */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* NAVIGATION BUTTONS */}
      <div className="absolute left-4 top-6 z-50 flex gap-4">
        {/* Elimination Back Button (Goes to Subject Selection) */}
        {isElimination && (
          <button
            onClick={goToSubSelection}
            className="group flex items-center gap-2"
          >
            <div className="bg-white/5 p-3 rounded-full border border-white/10 group-hover:border-yellow-500 transition-all shadow-lg backdrop-blur-md">
              <LucideArrowLeft
                className="text-white group-hover:text-yellow-400"
                size={20}
              />
            </div>
          </button>
        )}

        {/* General Back Button (Goes to Menu) - Hidden in Elimination Rounds */}
        {!isElimination && (
          <button onClick={goToMenu} className="group flex items-center gap-2">
            <div className="bg-white/5 p-3 rounded-full border border-white/10 group-hover:border-yellow-500 transition-all shadow-lg backdrop-blur-md">
              <Home
                className="text-white group-hover:text-yellow-400"
                size={20}
              />
            </div>
            <span className="text-white/40 text-[10px] font-black uppercase tracking-widest group-hover:text-yellow-400 transition-colors">
              Menu
            </span>
          </button>
        )}
      </div>

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

        <div className="bg-purple-600/20 px-6 py-1.5 rounded-full border border-yellow-500/30 backdrop-blur-md">
          <p className="text-yellow-500 font-mono tracking-[0.2em] uppercase text-[10px] font-black">
            COMPLETED: {currentAnsweredQuestions.length} / {totalItems}
          </p>
        </div>
      </div>

      {/* GRID CONTAINER */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full overflow-hidden px-4">
        <div
          className={`grid gap-3 ${width} w-full`}
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            justifyItems: "center",
          }}
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
                <div className="relative w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center">
                  <svg
                    viewBox="0 0 100 100"
                    className={`absolute inset-0 w-full h-full drop-shadow-2xl transition-all duration-500
                      ${
                        isAnswered
                          ? "fill-purple-900/60 stroke-purple-400 stroke-2"
                          : isSelected
                            ? "fill-yellow-500 stroke-white stroke-2"
                            : "fill-yellow-500/10 stroke-yellow-500 stroke-2 group-hover:fill-yellow-500/30 group-hover:drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]"
                      }`}
                  >
                    <path d="M50 2L63 38H100L70 60L81 98L50 75L19 98L30 60L0 38H37L50 2Z" />
                  </svg>

                  <div
                    className={`z-10 font-black transition-all duration-300 ${text}
                    ${isAnswered ? "text-purple-300" : "text-yellow-400"}`}
                  >
                    {num}
                  </div>

                  {isAnswered && (
                    <div className="absolute -top-1 -right-1 z-20 bg-purple-500 text-white rounded-full p-0.5 shadow-lg border border-white/20">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
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
