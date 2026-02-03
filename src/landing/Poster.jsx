import { useNavigationStore } from "../store/useNavigation";

// Poster Page
export const PosterPage = () => {
  const goToRules = useNavigationStore((state) => state.goToRules);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center p-8">
      <div className="text-center text-white">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 mb-8">
          <h2 className="text-6xl font-bold mb-4">QUIZ NIGHT</h2>
          <p className="text-3xl">2024 Championship</p>
        </div>
        <div className="flex justify-center mt-6">
          <CircularArrowButton onClick={goToRules} size={70} />
        </div>
      </div>
    </div>
  );
};
