import { ROUND_CONFIGS } from "../constants/roundConfig";
import { useNavigationStore } from "../store/useNavigation";

// Main Menu Page
export const MenuPage = () => {
  const startRound = useNavigationStore((state) => state.startRound);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 p-8">
      <h1 className="text-5xl font-bold text-white text-center mb-12">
        Select a Round
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {Object.values(ROUND_CONFIGS).map((round) => (
          <button
            key={round.key}
            onClick={() => startRound(round.key, round)}
            className="bg-linear-to-br from-purple-500 to-pink-500 p-6 rounded-xl hover:scale-105 transition transform text-white flex flex-col justify-between"
          >
            <h3 className="text-xl font-bold">{round.title}</h3>
            <img className="text-6xl mb-4" src={round.logo} />
          </button>
        ))}
      </div>
    </div>
  );
};
