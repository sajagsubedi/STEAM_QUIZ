import { useNavigationStore } from "../../store/useNavigation";

// Round Rules (Reusable)
export const RoundRules = ({ roundConfig }) => {
  const nextInRound = useNavigationStore((state) => state.nextInRound);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl p-12 max-w-2xl">
        <h2 className="text-4xl font-bold text-purple-600 mb-8">Rules</h2>
        <ul className="space-y-4 text-lg">
          {roundConfig.rules.map((rule, index) => (
            <li key={index} className="flex items-start">
              <span className="text-purple-600 font-bold mr-3">
                {index + 1}.
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={nextInRound}
          className="mt-8 bg-purple-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-purple-700 transition w-full"
        >
          Next →
        </button>
      </div>
    </div>
  );
};
