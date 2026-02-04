import React, { useState, useEffect } from "react";
import CircularTimer from "../../components/CircularTimer";
import { useNavigationStore } from "../../store/useNavigation";
import { ROUND_CONFIGS } from "../../constants/roundConfig";
import { ChevronRight, Trophy, Coins } from "lucide-react";

export function GamblingQuestion() {
  const { nextInRound } = useNavigationStore();
  const config = ROUND_CONFIGS["gambling"];

  // Local state for 10 teams
  const [teamWagers, setTeamWagers] = useState(Array(10).fill(null));

  const handleWagerSelect = (teamIndex, points) => {
    const newWagers = [...teamWagers];
    newWagers[teamIndex] = points;
    setTeamWagers(newWagers);
    // Sound removed as requested
  };

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden bg-linear-to-br from-gray-900 via-blue-900 to-black relative p-4 md:p-6">
      {/* BACKGROUND DECOR */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* HEADER */}
      <div className="relative z-10 flex justify-center items-center h-14 shrink-0">
        <div className="px-8 py-2 bg-linear-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full text-black text-xs font-black uppercase tracking-widest shadow-lg">
          {config.title}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-row gap-6 py-4 min-h-0 overflow-hidden">
        {/* LEFT SIDE: TEAM WAGER TABLE */}
        <div className="w-1/2 bg-blue-900/20 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
          <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-2">
            <Trophy className="text-yellow-500" size={18} />
            <h3 className="text-white font-black uppercase tracking-tighter text-sm">
              Team Risk Selection
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-[10px] text-blue-300 uppercase tracking-widest text-left">
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
                                ? "bg-yellow-500 border-yellow-400 text-black shadow-lg"
                                : "bg-blue-900/40 border-white/10 text-blue-200 hover:border-yellow-500"
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
        <div className="w-1/2 flex flex-col items-center justify-center p-4">
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <div className="text-center mb-6">
              <p className="text-blue-300 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                Round Timer
              </p>
              <div className="h-1 w-16 bg-yellow-500 mx-auto rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
            </div>

            {/* TIMER CONTAINER - Fixed centering and size */}
            <div className="relative flex items-center justify-center p-8 bg-blue-950/30 rounded-full border border-white/5 shadow-inner">
              <div className="scale-125 origin-center">
                <CircularTimer timers={config.timers} />
              </div>
            </div>
          </div>

          {/* STATUS & ACTIONS */}
          <div className="w-full max-w-xs space-y-3 mt-auto">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
              <div className="bg-yellow-500 p-2 rounded-lg text-black">
                <Coins size={20} />
              </div>
              <div>
                <p className="text-[10px] text-yellow-500 font-black uppercase">
                  Wagers Locked
                </p>
                <p className="text-white font-bold text-lg leading-none">
                  {teamWagers.filter((w) => w !== null).length} / 10
                </p>
              </div>
            </div>

            <button
              onClick={() => nextInRound()}
              className="w-full group flex items-center justify-between p-4 bg-yellow-600 hover:bg-yellow-500 rounded-2xl transition-all duration-300 text-black"
            >
              <span className="font-black uppercase tracking-widest text-xs">
                Finish Wager Round
              </span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
