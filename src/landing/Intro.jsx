import { useNavigationStore } from "../store/useNavigation";

// Intro Page
export const IntroPage = () => {
  const goToPoster = useNavigationStore((state) => state.goToPoster);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center p-8">
      <div className="text-center text-white max-w-2xl">
        <h2 className="text-5xl font-bold mb-6">Welcome to the Quiz!</h2>
        <p className="text-xl mb-8">
          Get ready for an exciting journey through various rounds of
          challenging questions.
        </p>
        <button
          onClick={goToPoster}
          className="bg-white text-blue-600 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
};
