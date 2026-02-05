import { ROUND_CONFIGS } from "../constants/roundConfig";
import { useNavigationStore } from "../store/useNavigation";

export const MenuPage = () => {
  const startRound = useNavigationStore((state) => state.startRound);

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-between py-6 px-4 overflow-hidden relative bg-linear-to-br from-gray-900 via-purple-900 to-black">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 text-center pt-2">
        <h2 className="text-purple-400 text-xs tracking-[0.4em] uppercase mb-1 font-semibold">
          Challenge Sequence
        </h2>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
          Select <span className="text-yellow-400">Your Round</span>
        </h1>
        <div className="h-1.5 w-24 bg-yellow-500 mx-auto mt-3 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.6)]" />
      </div>

      {/* Rounds Grid - Text sizes increased */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-7xl w-full relative z-10 my-auto px-2">
        {Object.values(ROUND_CONFIGS).map((round, index) => (
          <button
            key={round.key}
            onClick={() => startRound(round.key, round)}
            className="group relative flex flex-col items-center p-5 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {/* Background Glass Card */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl transition-all group-hover:bg-white/10 group-hover:border-yellow-500/50 group-hover:shadow-[0_0_25px_rgba(234,179,8,0.2)]" />

            {/* Number Indicator */}
            <span className="absolute top-3 right-4 text-white/10 font-mono text-sm group-hover:text-yellow-500/40 transition-colors">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Logo/Icon Container */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 mb-4 flex items-center justify-center">
              <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                className="relative w-full h-full object-contain drop-shadow-2xl grayscale-[0.2] group-hover:grayscale-0 transition-all duration-300"
                src={round.logo}
                alt={round.title}
              />
            </div>

            {/* Text Content - Increased size and weight */}
            <h3 className="relative text-base md:text-lg font-black text-white group-hover:text-yellow-400 transition-colors text-center leading-snug tracking-tight">
              {round.title}
            </h3>

            <p className="relative mt-3 text-[10px] font-bold text-purple-300/50 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-[0.2em]">
              Start Round
            </p>
          </button>
        ))}
      </div>

      {/* Footer Decoration */}
      <div className="relative z-10 text-purple-400/20 text-[10px] tracking-[1em] uppercase pointer-events-none pb-2">
        Steam Quiz Systems 
      </div>
    </div>
  );
};