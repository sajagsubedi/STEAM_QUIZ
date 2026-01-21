import { useNavigationStore } from "../../store/useNavigation"

export const QuestionSelection = ({ roundConfig }) => {
  const { currentRound, selectedQuestion, answeredQuestions, selectQuestion, nextInRound } =
    useNavigationStore()

  const totalItems = typeof roundConfig.sets === "number" ? roundConfig.sets : roundConfig.totalQuestions

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 to-red-600 p-8">
      <h2 className="text-4xl font-bold text-white text-center mb-12">
        {currentRound === "rapidFire" ? "Select a Set" : "Select a Question"}
      </h2>
      <div className="grid grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
        {Array.from(
          { length: totalItems },
          (_, i) => i + 1
        ).map((num) => {
          const isAnswered = answeredQuestions.includes(num)
          const isSelected = selectedQuestion === num

          return (
            <button
              key={num}
              onClick={() => {
                if (!isAnswered) {
                  selectQuestion(num)
                  nextInRound()
                }
              }}
              className={`aspect-square rounded-xl text-4xl font-bold transition ${
                isAnswered
                  ? "bg-gray-400 cursor-not-allowed"
                  : isSelected
                  ? "bg-yellow-400 text-gray-900 scale-110"
                  : "bg-white text-pink-600 hover:scale-105"
              }`}
            >
              {num}
            </button>
          )
        })}
      </div>
    </div>
  )
}
