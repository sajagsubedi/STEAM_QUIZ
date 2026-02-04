import { useNavigationStore } from "../../store/useNavigation";
import CircularArrowButton from "../../components/CircularArrowButton";

export const RoundRules = ({ roundConfig }) => {
  const nextInRound = useNavigationStore((state) => state.nextInRound);

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 via-blue-900 to-black relative px-6">
      {/* Background Grid Pattern for a 'Technical' feel */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl">
        {/* Header with Round Info */}
        <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-6">
          <img
            src={roundConfig.logo}
            alt="Round Icon"
            className="w-16 h-16 object-contain filter drop-shadow-[0_0_10px_rgba(234,179,8,0.4)]"
          />
          <div>
            <h2 className="text-yellow-400 text-xs tracking-[0.4em] uppercase font-bold mb-1">
              Briefing: {roundConfig.title}
            </h2>
            <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
              Operational <span className="text-blue-400">Rules</span>
            </h1>
          </div>
        </div>

        {/* Rules Container */}
        <div className="grid gap-4">
          {roundConfig.rules.map((rule, index) => (
            <div
              key={index}
              className="group flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 transition-all duration-300 hover:bg-white/10 hover:border-yellow-500/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300 font-mono font-bold mr-5 group-hover:bg-yellow-500/20 group-hover:text-yellow-400 group-hover:border-yellow-500/40 transition-colors">
                {String(index + 1).padStart(2, "0")}
              </div>
              <p className="text-blue-100 text-base md:text-lg font-light tracking-wide leading-relaxed">
                {rule}
              </p>
            </div>
          ))}
        </div>

        {/* Footer / Navigation */}
        <div className="mt-12 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase">
              Systems Ready • Awaiting Initialization
            </p>
          </div>
          <CircularArrowButton onClick={nextInRound} size={75} />
        </div>
      </div>

      <style jsx>{`
        .group {
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};
