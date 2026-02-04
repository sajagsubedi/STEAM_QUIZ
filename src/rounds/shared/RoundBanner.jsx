import { useNavigationStore } from "../../store/useNavigation";
import CircularArrowButton from "../../components/CircularArrowButton";

export const RoundBanner = ({ roundConfig }) => {
  const nextInRound = useNavigationStore((state) => state.nextInRound);

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 via-blue-900 to-black relative">
      {/* Cinematic Background Light Beam */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[40%] bg-blue-500/10 rotate-12 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full px-6 text-center">
        {/* Label: Stage Indicator */}
        <p className="text-yellow-500/80 text-sm tracking-[0.6em] uppercase mb-6 font-semibold animate-pulse">
          Initializing Challenge Phase
        </p>

        {/* Round Logo with Interactive Glow */}
        <div className="relative group mb-8">
          <div className="absolute inset-0 bg-yellow-400 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
          <img
            src={roundConfig.logo}
            alt={roundConfig.title}
            className="relative w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Title Section */}
        <div className="space-y-4 mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic">
            {roundConfig.title}
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-400" />
            <span className="text-blue-300 text-xs tracking-[0.4em] uppercase font-light">
              Phase Sequence Active
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-400" />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase">
            Click to proceed
          </p>
          <CircularArrowButton onClick={nextInRound} size={80} />
        </div>
      </div>

      {/* Decorative Bottom Text */}
      <div className="absolute bottom-8 left-0 right-0 text-center opacity-20">
        <span className="text-white text-[9px] tracking-[1.5em] uppercase pl-[1.5em]">
          Think • Explore • Achieve
        </span>
      </div>

      <style jsx>{`
        h1 {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          animation: titleEnter 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @keyframes titleEnter {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
            letter-spacing: 0.5em;
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
            letter-spacing: normal;
          }
        }
      `}</style>
    </div>
  );
};
