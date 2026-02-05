import React from "react";
import { LayoutGrid } from "lucide-react";
import { useNavigationStore } from "../../store/useNavigation";
import { ROUND_CONFIGS } from "../../constants/roundConfig";

// Specific Question Components
import { GeneralQuestion } from "../specific/GeneralQuestion";
import { RoundBanner } from "./RoundBanner";
import { RoundRules } from "./RoundRules";
import { QuestionSelection } from "./QuestionSelection";
import { ContemporaryQuestion } from "../specific/ContemporaryQuestion";
import { AlternativeQuestion } from "../specific/AlternativeQuestion";
import { RapidFireQuestion } from "../specific/RapidFireQuestion";
import { QRQuestion } from "../specific/QRQuestion";
import { AVQuestion } from "../specific/AVQuestion";
import { OpenQuestion } from "../specific/OpenQuestion";
import { EliminationQuestion } from "../specific/EliminationQuestion";
import { SubjectSelection } from "./SubjectSelection";
import { GamblingQuestion } from "../specific/GamblingQuestion";

const RoundLayout = () => {
  const { currentRound, getCurrentStep } = useNavigationStore();
  const currentStep = getCurrentStep();
  const roundConfig = ROUND_CONFIGS[currentRound];

  if (!roundConfig) return null;

  switch (currentStep) {
    case "banner":
      return <RoundBanner roundConfig={roundConfig} />;
    case "rules":
      return <RoundRules roundConfig={roundConfig} />;
    case "subselection":
      return <SubjectSelection roundConfig={roundConfig} />;
    case "select":
      return <QuestionSelection roundConfig={roundConfig} />;
    case "question":
      if (currentRound === "general") return <GeneralQuestion />;
      if (currentRound === "elimination1") return <EliminationQuestion />;
      if (currentRound === "alternative") return <AlternativeQuestion />;
      if (currentRound === "elimination2") return <EliminationQuestion />;
      if (currentRound === "quickResponse") return <QRQuestion />;
      if (currentRound === "av") return <AVQuestion />;
      if (currentRound === "gambling") return <GamblingQuestion />;
      if (currentRound === "rapidFire") return <RapidFireQuestion />;
      if (currentRound === "contemporary") return <ContemporaryQuestion />;
      if (currentRound === "open") return <OpenQuestion />;
      return null;
    default:
      return null;
  }
};

/**
 * RoundContainer serves as the root wrapper for the quiz experience,
 * providing the background, menu access, and layout constraints.
 */
export const RoundContainer = () => {
  const { goToMenu } = useNavigationStore();

  return (
    <section className="h-screen w-screen overflow-hidden relative bg-black select-none">
      {/* Main Quiz Content */}
      <RoundLayout />

      {/* SYSTEM MENU BUTTON (TOP RIGHT) */}
      <div className="absolute top-4 right-4 z-[60] flex items-center gap-3">
        <button
          onClick={goToMenu}
          title="Return to Main Menu"
          className="group relative flex items-center justify-center w-12 h-12 bg-white/5 hover:bg-purple-600/20 backdrop-blur-md border border-white/10 hover:border-purple-400/50 rounded-xl transition-all duration-300 shadow-2xl overflow-hidden"
        >
          {/* Subtle Background Glow on Hover */}
          <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Menu Icon */}
          <LayoutGrid
            className="relative z-10 text-white/70 group-hover:text-purple-400 group-hover:scale-110 transition-all duration-300"
            size={24}
          />

          {/* Brackets for "Tech" UI feel */}
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-purple-400 transition-colors" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-purple-400 transition-colors" />

          {/* Scanning Line Animation */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-purple-400/30 -translate-y-full group-hover:animate-scan-line" />
        </button>
      </div>

      {/* Global Scoped Styles */}
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-10px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(50px);
            opacity: 0;
          }
        }
        .group:hover .group-hover\:animate-scan-line {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default RoundContainer;
