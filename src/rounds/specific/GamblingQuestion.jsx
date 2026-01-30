import React from "react";
import CircularTimer from "../../components/CicrcularTimer";
import { ROUND_CONFIGS } from "../../constants/roundConfig";

export function GamblingQuestion() {
  const config = ROUND_CONFIGS["gambling"];
  return (
    <div className="min-h-screen bg-linear-to-b from-pink-200 via-purple-200 to-sky-400 p-6 flex flex-col relative">
      <div>
        <div className="flex justify-center w-full">
          <div className="p-4 bg-rose-400 rounded-full text-2xl font-bold text-white uppercase">
            {config.title}
          </div>
        </div>

      </div>
      <div className="w-full h-[60vh] p-6">
      </div>
      <div className="h-[20vh] w-fulाl flex self-end justify-end">
      </div>
      <CircularTimer timers={config.timers} />
    </div>
  );
}
