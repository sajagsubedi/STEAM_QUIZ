import React, { useEffect } from "react";
import { useNavigationStore } from "./store/useNavigation";
import { WelcomePage, IntroPage, PosterPage, RulesPage } from "./landing";
import { MenuPage } from "./rounds/Menu";
import { RoundContainer } from "./rounds/shared/RoundContainer";

// Main App Component
export default function QuizApp() {
  const {
    currentPage,
    nextInRound,
    goToIntro,
    goToPoster,
    goToRules,
    goToMenu,
    getCurrentStep,
    currentRound,
  } = useNavigationStore();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        if (currentPage === "welcome") goToIntro();
        else if (currentPage === "intro") goToPoster();
        else if (currentPage === "poster") goToRules();
        else if (currentPage === "rules") goToMenu();
        else if (currentPage === "round") {
          const step = getCurrentStep(); 
          if ( step !== "question") {
            nextInRound();
          }
        }
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [
    currentPage,
    currentRound,
    getCurrentStep,
    goToIntro,
    goToPoster,
    goToRules,
    goToMenu,
    nextInRound,
  ]);

  // Render current page
  switch (currentPage) {
    case "welcome":
      return <WelcomePage />;
    case "intro":
      return <IntroPage />;
    case "poster":
      return <PosterPage />;
    case "rules":
      return <RulesPage />;
    case "menu":
      return <MenuPage />;
    case "round":
      return <RoundContainer />;
    default:
      return <WelcomePage />;
  }
}
