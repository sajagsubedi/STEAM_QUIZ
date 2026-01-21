import { useNavigationStore } from "../store/useNavigation";

// Welcome Page
export const WelcomePage = () => {
  const goToIntro = useNavigationStore((state) => state.goToIntro);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-8">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-8">Quiz Contest 2024</h1>
        <p className="text-2xl mb-12">Press Enter or click Next to begin</p>
        <button
          onClick={goToIntro}
          className="bg-white text-purple-600 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
};
