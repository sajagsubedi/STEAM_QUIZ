import { LucideArrowLeft } from "lucide-react";
import { ROUND_CONFIGS } from "../../constants/roundConfig";
import { useNavigationStore } from "../../store/useNavigation";

const getGridConfig = (total) => {
  // Tighter constraints to ensure screen fit
  if (total <= 4) return { cols: 2, text: "text-5xl", maxWidth: 500 };
  if (total <= 6) return { cols: 3, text: "text-4xl", maxWidth: 600 };
  if (total <= 12) return { cols: 4, text: "text-3xl", maxWidth: 750 };
  if (total <= 24) return { cols: 6, text: "text-2xl", maxWidth: 900 };
  return { cols: 8, text: "text-xl", maxWidth: 1100 };
};

export const QuestionSelection = ({ roundConfig }) => {
  const {
    currentRound,
    selectedQuestion,
    answeredQuestions,
    selectQuestion,
    nextInRound,
    currentSubjectId,
    goToSubSelection
  } = useNavigationStore();

  let currentAnsweredQuestions;
  if (currentRound === "elimination1" || currentRound === "elimination2") {
    currentAnsweredQuestions = answeredQuestions[currentRound]?.[currentSubjectId] || [];
  } else {
    currentAnsweredQuestions = answeredQuestions[currentRound] || [];
  }

  const totalItems = typeof roundConfig.sets === "number"
    ? roundConfig.sets
    : typeof roundConfig.questionsPerSubject === "number"
      ? roundConfig.questionsPerSubject : roundConfig.totalQuestions;

  const { cols, text, maxWidth } = getGridConfig(totalItems);
  const config = ROUND_CONFIGS[currentRound];

  return (
    // Changed to h-screen and justify-between to force everything into one view
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-between overflow-hidden bg-linear-to-br from-gray-900 via-blue-900 to-black relative p-4 pb-8">
      
      {/* Background Tech Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px)`, backgroundSize: '50px 50px' }} 
      />

      {/* Back Button */}
      {currentRound.startsWith("elimination") && (
        <button
          onClick={goToSubSelection}
          className="absolute left-6 top-6 z-50 group flex items-center gap-2"
        >
          <div className="bg-white/5 p-3 rounded-full border border-white/10 group-hover:border-yellow-500 transition-all">
            <LucideArrowLeft className="text-white group-hover:text-yellow-400" size={20} />
          </div>
        </button>
      )}

      {/* HEADER SECTION - Compacted */}
      <div className="relative z-10 flex flex-col items-center mt-2 text-center">
        {/* GOLDISH GRADIENT BADGE - Smaller & Sleek */}
        <div className="px-8 py-2 bg-linear-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full text-black text-sm md:text-base font-black uppercase tracking-[0.3em] mb-3 shadow-[0_0_20px_rgba(234,179,8,0.3)] border-b-2 border-yellow-800">
          {config.title}
        </div>
        
        <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">
          {currentRound === "rapidFire" ? "Select a Set" : "Select a Question"}
        </h2>
        
        <div className="bg-blue-900/30 px-4 py-1 rounded-full border border-blue-400/20 backdrop-blur-sm">
          <p className="text-blue-300 font-mono tracking-widest uppercase text-[10px] font-bold">
            PROGRESS: {currentAnsweredQuestions.length} / {totalItems}
          </p>
        </div>
      </div>

      {/* QUESTION GRID - Responsive sizing to fit screen */}
      <div
        className="relative z-10 flex-1 grid gap-2 md:gap-4 place-content-center mx-auto w-full px-4"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          maxWidth: `${maxWidth}px`,
        }}
      >
        {Array.from({ length: totalItems }, (_, i) => i + 1).map((num) => {
          const isAnswered = currentAnsweredQuestions.includes(num);
          const isSelected = selectedQuestion === num;

          return (
            <button
              key={num}
              onClick={() => !isAnswered && (selectQuestion(num), nextInRound())}
              className={`
                relative group flex items-center justify-center transition-all duration-300
                ${isAnswered ? "opacity-30 grayscale-[0.5]" : "hover:scale-110 active:scale-95"}
              `}
            >
              {/* STAR CONTAINER - Responsive height based on screen size */}
              <div className="relative w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center">
                
                <svg 
                  viewBox="0 0 100 100" 
                  className={`absolute inset-0 w-full h-full drop-shadow-xl transition-all duration-500
                    ${isSelected ? "fill-yellow-400" : "fill-white/5"}
                    ${isAnswered 
                      ? "fill-transparent stroke-white/20 stroke-[1px]" 
                      : "stroke-blue-400/50 group-hover:stroke-yellow-400 stroke-[2px]"
                    }
                  `}
                >
                  <path d="M50 2L63 38H100L70 60L81 98L50 75L19 98L30 60L0 38H37L50 2Z" />
                </svg>

                {/* NUMBERED BADGE */}
                <div className={`
                  z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black transition-all duration-300 border-2
                  ${text}
                  ${isAnswered 
                    ? "bg-transparent border-gray-800 text-gray-700" 
                    : isSelected
                      ? "bg-black border-yellow-400 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.4)]"
                      : "bg-blue-900/40 border-blue-400/60 text-white group-hover:border-yellow-400 group-hover:text-yellow-400"
                  }
                `}>
                  {num}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* FOOTER - Minimal */}
      <div className="relative z-10 text-white/10 text-[8px] tracking-[1em] uppercase font-light pointer-events-none mt-2">
        Steam Quiz Systems
      </div>
    </div>
  );
};