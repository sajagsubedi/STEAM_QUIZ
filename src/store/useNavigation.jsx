import { create } from "zustand";
import { ROUND_CONFIGS } from "../constants/roundConfig";

const initialRoundState = {
  currentRound: null,
  currentRoundFlow: [],
  currentFlowIndex: 0,
  selectedQuestion: null,
  sequentialCount: 1,
  answeredQuestions: [],
};

export const useNavigationStore = create((set, get) => ({
  // --------------------
  // Global navigation
  // --------------------
  currentPage: "welcome", // welcome | intro | poster | rules | menu | round

  ...initialRoundState,

  goToPage: (page) => set({ currentPage: page }),

  goToIntro: () => set({ currentPage: "intro" }),
  goToPoster: () => set({ currentPage: "poster" }),
  goToRules: () => set({ currentPage: "rules" }),

  goToMenu: () =>
    set({
      currentPage: "menu",
      ...initialRoundState,
    }),

  // --------------------
  // Round lifecycle
  // --------------------
  startRound: (roundKey) => {
    const config = ROUND_CONFIGS[roundKey];
    if (!config) return;

    set({
      currentPage: "round",
      currentRound: roundKey,
      currentRoundFlow: config.flow,
      currentFlowIndex: 0,
      sequentialCount: 1,
      selectedQuestion: null,
      answeredQuestions: [],
    });
  },

  // --------------------
  // Round navigation
  // --------------------
  nextInRound: () => {
    const state = get();
    const {
      currentRoundFlow,
      currentRound,
      currentFlowIndex,
      selectedQuestion,
      answeredQuestions,
      sequentialCount,
      goToMenu
    } = state;

    if (!currentRoundFlow.length) {
      return;
    }

    const step = currentRoundFlow[currentFlowIndex];

    // Block question screen without selection
    if (step === "select" && !selectedQuestion) return;


    if (currentRound == "quickResponse" && step == "question") {
      if (sequentialCount <= ROUND_CONFIGS["quickResponse"].totalQuestions) {
        set({ sequentialCount: sequentialCount + 1 })
      }
      else {
        goToMenu()
      }

    }
    if (currentRound == "open" && step == "question") {
      if (sequentialCount <= ROUND_CONFIGS["open"].totalQuestions) {
        set({ sequentialCount: sequentialCount + 1 })
      }
      else {
        goToMenu()
      }

    }


    // --------------------
    // Question logic
    // --------------------
    if (step === "question") {
      if (selectedQuestion) {
        set({
          answeredQuestions: [...answeredQuestions, selectedQuestion],
          selectedQuestion: null,
        })
      }
    }


    // --------------------
    // Flow navigation
    // --------------------
    if (currentFlowIndex < currentRoundFlow.length - 1) {
      set({ currentFlowIndex: currentFlowIndex + 1 });
    } else {
      const selectIndex = currentRoundFlow.indexOf("select");
      const questionIndex = currentRoundFlow.indexOf("question");

      set({
        currentFlowIndex: selectIndex !== -1 ? selectIndex : questionIndex,
      });
    }
  },

  // --------------------
  // Selection helpers
  // --------------------
  selectQuestion: (questionNumber) => set({ selectedQuestion: questionNumber }),

  getCurrentStep: () => {
    const { currentRoundFlow, currentFlowIndex } = get();
    return currentRoundFlow[currentFlowIndex] ?? null;
  },
}));
