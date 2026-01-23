import { useNavigationStore } from "../../store/useNavigation"

const getGridConfig = (total) => {
  if (total <= 4) return { cols: 2, text: "text-4xl", maxWidth: 320 }
  if (total <= 6) return { cols: 3, text: "text-4xl", maxWidth: 420 }
  if (total <= 8) return { cols: 4, text: "text-4xl", maxWidth: 520 }
  if (total <= 12) return { cols: 4, text: "text-3xl", maxWidth: 520 }
  if (total <= 16) return { cols: 4, text: "text-3xl", maxWidth: 520 }
  if (total <= 24) return { cols: 6, text: "text-2xl", maxWidth: 760 }
  return { cols: 8, text: "text-xl", maxWidth: 960 }
}

export const QuestionSelection = ({ roundConfig }) => {
  const {
    currentRound,
    selectedQuestion,
    answeredQuestions,
    selectQuestion,
    nextInRound,
  } = useNavigationStore()

  const totalItems =
    typeof roundConfig.sets === "number"
      ? roundConfig.sets
      : roundConfig.totalQuestions

  const { cols, text, maxWidth } = getGridConfig(totalItems)

  return (
    <div className="min-h-screen max-h-screen bg-gradient-to-b from-pink-200 via-purple-200 to-sky-400 p-6 flex flex-col">
      
      {/* HEADER */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="px-6 py-3 bg-rose-400 rounded-full text-2xl font-bold text-white uppercase shadow-lg">
          {currentRound?.replace(/([A-Z])/g, " $1")} Round
        </div>

        <h2 className="text-3xl font-bold text-gray-800">
          {currentRound === "rapidFire" ? "Select a Set" : "Select a Question"}
        </h2>

        <div className="text-lg font-medium text-gray-700">
          Answered{" "}
          <span className="font-bold">
            {answeredQuestions.length}/{totalItems}
          </span>
        </div>
      </div>

      {/* QUESTION GRID */}
      <div
        className="flex-1 grid gap-6 place-content-center mx-auto"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          maxWidth: `${maxWidth}px`,
        }}
      >
        {Array.from({ length: totalItems }, (_, i) => i + 1).map((num) => {
          const isAnswered = answeredQuestions.includes(num)
          const isSelected = selectedQuestion === num

          return (
            <button
              key={num}
              disabled={isAnswered}
              onClick={() => {
                if (!isAnswered) {
                  selectQuestion(num)
                  nextInRound()
                }
              }}
              className={`
                aspect-square rounded-2xl font-bold flex items-center justify-center
                transition-all duration-200 shadow-lg p-8
                ${text}
                ${
                  isAnswered
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed opacity-70"
                    : isSelected
                    ? "bg-yellow-400 text-gray-900 scale-110 ring-4 ring-yellow-300"
                    : "bg-white text-pink-600 hover:scale-105 hover:bg-pink-100"
                }
              `}
            >
              {num}
            </button>
          )
        })}
      </div>
    </div>
  )
}
