import React, { useState } from "react";
import CircularTimer from "../../components/CircularTimer";
import { useNavigationStore } from "../../store/useNavigation";
import { ROUND_CONFIGS } from "../../constants/roundConfig";
import { ChevronRight, Trophy, Coins, Hash } from "lucide-react";

function WagerQuestionComp() {
  const { nextInRound, sequentialCount } = useNavigationStore();
  const config = ROUND_CONFIGS["gambling"];

  // Local state for 10 teams
  const [teamWagers, setTeamWagers] = useState(Array(6).fill(null));

  const handleWagerSelect = (teamIndex, points) => {
    const newWagers = [...teamWagers];
    newWagers[teamIndex] = points;
    setTeamWagers(newWagers);
  };

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden bg-linear-to-br from-gray-900 via-purple-900 to-black relative p-4 md:p-6">
      {/* BACKGROUND DECOR */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* HEADER SECTION */}
      <div className="relative z-10 flex justify-between items-center h-16 shrink-0 px-4">
        {/* SEQUENTIAL COUNT BADGE */}
        <div className="flex items-center gap-2 bg-yellow-500 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
          <Hash className="text-black" size={16} />
          <span className="text-black font-black text-sm">
            {sequentialCount}
          </span>
        </div>

        {/* Title Badge */}
        <div className="px-8 py-2 bg-linear-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full text-black text-xs font-black uppercase tracking-widest shadow-lg">
          {config.title}
        </div>
        {/* Empty space for symmetry */}
        <div className="w-24 hidden md:block" />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="relative z-10 flex-1 flex flex-row gap-6 py-4 min-h-0">
        {/* LEFT SIDE: TEAM WAGER TABLE */}
        <div className="w-2/3 bg-purple-900/20 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
          <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-2">
            <Trophy className="text-yellow-500" size={18} />
            <h3 className="text-white font-black uppercase tracking-tighter text-sm">
              Team Risk Selection
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-[10px] text-purple-300 uppercase tracking-widest text-left">
                  <th className="px-4 pb-2">Team</th>
                  <th className="px-4 pb-2 text-center">Points to Risk</th>
                </tr>
              </thead>
              <tbody>
                {teamWagers.map((currentWager, idx) => (
                  <tr key={idx} className="bg-white/5 group transition-colors">
                    <td className="px-4 py-2 rounded-l-xl border-l-2 border-transparent group-hover:border-yellow-500 transition-all">
                      <span className="text-white font-bold text-sm">
                        TEAM {idx + 1}
                      </span>
                    </td>
                    <td className="px-4 py-2 rounded-r-xl">
                      <div className="flex justify-center gap-1.5">
                        {config.points.map((pt) => (
                          <button
                            key={pt}
                            onClick={() => handleWagerSelect(idx, pt)}
                            className={`px-3 py-1 rounded-md text-[10px] font-black transition-all border ${
                              currentWager === pt
                                ? "bg-yellow-500 border-yellow-400 text-black shadow-lg scale-105"
                                : "bg-purple-900/40 border-white/10 text-purple-200 hover:border-yellow-500"
                            }`}
                          >
                            {pt}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT SIDE: CENTERED TIMER & STATUS */}
        <div className="w-1/3 flex flex-col gap-6">
          {/* TOP HALF: TIMER */}
          <div className="flex-1 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-6 text-center">
              <p className="text-purple-300 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                Round Timer
              </p>
              <div className="h-1 w-12 bg-yellow-500 mx-auto rounded-full" />
            </div>

            {/* Fixed Timer Layout: Uses a square container to prevent distortion */}
            <div className="w-64 h-64 relative flex items-center justify-center scale-110">
              <CircularTimer timers={config.timers} />
            </div>
          </div>

          {/* BOTTOM HALF: STATUS & ACTIONS */}
          <div className="h-40 shrink-0 space-y-3">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
              <div className="bg-yellow-500 p-2.5 rounded-xl text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                <Coins size={24} />
              </div>
              <div>
                <p className="text-[10px] text-yellow-500 font-black uppercase tracking-wider">
                  Wagers Locked
                </p>
                <p className="text-white font-bold text-2xl leading-none mt-1">
                  {teamWagers.filter((w) => w !== null).length}{" "}
                  <span className="text-white/30 text-sm font-normal">
                    / 10
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={() => nextInRound()}
              className="w-full group flex items-center justify-between p-5 bg-yellow-600 hover:bg-yellow-500 rounded-2xl transition-all duration-300 text-black shadow-lg"
            >
              <span className="font-black uppercase tracking-widest text-xs">
                Finish Wager Round
              </span>
              <div className="bg-black/10 p-1 rounded-lg group-hover:translate-x-1 transition-transform">
                <ChevronRight size={24} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GamblingQuestion() {
  const { sequentialCount } = useNavigationStore();
  return <WagerQuestionComp key={sequentialCount} />;
}
