import { useNavigationStore } from "../store/useNavigation";
import CircularArrowButton from "../components/CircularArrowButton";

export const RulesPage = () => {
  const goToMenu = useNavigationStore((state) => state.goToMenu);

  const rules = [
    "Each team must consist of 2 participants.",
    "No use of mobile phones or electronic devices.",
    "Each round will have a fixed time limit.",
    "The decision of the quizmaster is final.",
    "Tie-breaker rounds will be conducted if necessary.",
  ];

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 via-purple-900 to-black relative">
      {/* Background Decorative Elements (Matching Landing Page) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Glassmorphic Container */}
      <div
        className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 max-w-2xl w-[90%] shadow-2xl"
        style={{
          boxShadow:
            "0 0 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)",
        }}
      >
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-4">
            {/* Glowing Ring around icon */}
            <div className="absolute inset-0 bg-yellow-400 blur-lg opacity-40 animate-pulse" />
            <div className="relative bg-gradient-to-b from-yellow-300 to-yellow-600 p-4 rounded-2xl rotate-3 shadow-xl">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-[0.15em] uppercase text-center">
            Quiz <span className="text-yellow-400">Rules</span>
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mt-2" />
        </div>

        {/* Rules List */}
        <div className="space-y-6">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className="group flex items-start space-x-4 transition-transform duration-300 hover:translate-x-2"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 font-bold text-sm">
                {idx + 1}
              </div>
              <p className="text-purple-50 text-base md:text-lg leading-relaxed font-light tracking-wide pt-0.5">
                {rule}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Button */}
        <div className="flex flex-col items-center mt-12">
          <p className="text-xs text-purple-300/60 uppercase tracking-[0.4em] mb-4">
            Proceed to Menu
          </p>
          <CircularArrowButton onClick={goToMenu} size={65} />
        </div>
      </div>

      {/* Global CSS for subtle movement */}
      <style jsx>{`
        div {
          animation: fadeIn 0.8s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default RulesPage;
