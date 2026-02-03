import { useNavigationStore } from "../store/useNavigation";
import CircularArrowButton from "../components/CircularArrowButton";

export const RulesPage = () => {
  const goToMenu = useNavigationStore((state) => state.goToMenu);

  // Example rules, replace or update as needed
  const rules = [
    "Each team must consist of 2 participants.",
    "No use of mobile phones or electronic devices is allowed during the quiz.",
    "Each round will have a fixed time limit.",
    "The decision of the quizmaster is final.",
    "In case of a tie, a tie-breaker round will be conducted.",
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#24243e] p-4"
      style={{ minHeight: '100vh' }}
    >
      <div
        className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl px-8 py-10 max-w-lg w-full relative"
        style={{ boxShadow: '0 8px 40px 0 #00eaff55, 0 1.5px 8px #fffbe7' }}
      >
        {/* Header with icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-tr from-[#7c3aed] to-[#00eaff] rounded-full p-3 mb-2 shadow-lg">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="19" cy="19" r="19" fill="#fff" />
              <path d="M12 26l7-14 7 14" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg mb-1">Quiz Rules</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-[#7c3aed] to-[#00eaff] rounded-full mb-2" />
        </div>

        {/* Rules List */}
        <ul className="text-lg text-white/90 space-y-4 mb-8 list-disc list-inside">
          {rules.map((rule, idx) => (
            <li key={idx} className="pl-2">{rule}</li>
          ))}
        </ul>

        {/* Enter Button */}
        <div className="flex justify-center mt-6">
          <CircularArrowButton onClick={goToMenu} size={70} />
        </div>
      </div>
    </div>
  );
};
