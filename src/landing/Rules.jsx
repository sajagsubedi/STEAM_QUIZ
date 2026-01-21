import { useNavigationStore } from "../store/useNavigation";

// Poster Page
export const RulesPage = () => {
  const goToMenu = useNavigationStore((state) => state.goToMenu);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center p-8">
      <div className="text-center text-white">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 mb-8">
          Rules
        </div>
        <button
          onClick={goToMenu}
          className="bg-white text-teal-600 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition"
        >
          Enter →
        </button>
      </div>
    </div>
  );
};
