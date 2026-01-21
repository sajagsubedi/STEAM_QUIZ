import { useNavigationStore } from "../../store/useNavigation";

// Round Banner (Reusable)
export const RoundBanner = ({ roundConfig }) => {
  const nextInRound = useNavigationStore((state) => state.nextInRound);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center p-8">
      <div className="text-center text-white">
        <img src={roundConfig.logo}/>
        <h1 className="text-6xl font-bold mb-4">{roundConfig.title}</h1>
        <button
          onClick={nextInRound}
          className="mt-8 bg-white text-purple-600 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
};
