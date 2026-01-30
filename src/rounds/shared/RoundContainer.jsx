import { ROUND_CONFIGS } from "../../constants/roundConfig";
import { useNavigationStore } from "../../store/useNavigation";
import { GeneralQuestion } from "../specific/GeneralQuestion";
import { RoundBanner } from "./RoundBanner";
import { RoundRules } from "./RoundRules";
import { QuestionSelection } from "./QuestionSelection";
import { ContemporyQuestion } from "../specific/ContemporyQuestion";
import { AlternativeQuestion } from "../specific/AlternativeQuestion";
import { RapidFireQuestion } from "../specific/RapidFireQuestion";
import { QRQuestion } from "../specific/QRQuestion";
import { AVQuestion } from "../specific/AVQuestion";
import { OpenQuestion } from "../specific/OpenQuestion";
import { AppWindow, LucideArrowRight } from "lucide-react";
import { EliminationQuestion } from "../specific/EliminationQuestion";
import { SubjectSelection } from "./SubjectSelection";
import { GamblingQuestion } from "../specific/GamblingQuestion";


// Main Round Container
export const RoundLayout = () => {
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
      if (currentRound === "contempory") return <ContemporyQuestion />;
      if (currentRound === "open") return <OpenQuestion />;
      break;
    default:
      return null;
  }
};

export const RoundContainer = () => {
  const { goToMenu, nextInRound, getCurrentStep } = useNavigationStore();
  const currentStep = getCurrentStep()
  const goNext = () => {
    nextInRound()
  }

  return (
    <section className="max-h-screen ">
      <RoundLayout />
      <div className="absolute top-0 right-0 p-2">
        <button
          onClick={goToMenu}
          className="bg-rose-500 p-2 rounded text-white"
        >
          <AppWindow />
        </button>
      </div>
      {currentStep != "select" && currentStep != "subselection" && (

        <div className="absolute top-1/2 right-0 p-2 flex justify-end w-full ">
          <button
            onClick={goNext}
            className="bg-white p-2 rounded-full text-rose-500 cursor-pointer"
          >
            <LucideArrowRight />
          </button>
        </div>
      )
      }
    </section>
  );
};
