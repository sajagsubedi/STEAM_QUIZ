import { create } from "zustand";
import { ROUND_CONFIGS } from "../constants/roundConfig";

const initialRoundState = {
  currentRound: null,
  currentRoundFlow: [],
  currentFlowIndex: 0,
  selectedQuestion: null,
  answeredQuestions: [],
  sequentialCount: 0,
  rapidFireQuestionIndex: 0,
};

export const useNavigationStore = create((set, get) => ({
  // --------------------
  // Global navigation
  // --------------------
  currentPage: "welcome", // welcome | intro | poster | rules | menu | round

  ...initialRoundState,

  // --------------------
  // Page navigation
  // --------------------
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
      selectedQuestion: null,
      answeredQuestions: [],
      sequentialCount: 0,
      rapidFireQuestionIndex: 0,
    });
  },

  // --------------------
  // Round navigation
  // --------------------
  nextInRound: () => {
    const state = get();
    const {
      currentRound,
      currentRoundFlow,
      currentFlowIndex,
      selectedQuestion,
      answeredQuestions,
      sequentialCount,
      rapidFireQuestionIndex,
    } = state;

    if (!currentRoundFlow.length) return;

    const step = currentRoundFlow[currentFlowIndex];

    // Block question screen without selection
    if (step === "select" && !selectedQuestion) return;

    // --------------------
    // Question logic
    // --------------------
    if (step === "question") {
      //  Rapid Fire
      if (currentRound === "rapidFire") {
        const QUESTIONS_PER_SET = 10;

        if (rapidFireQuestionIndex < QUESTIONS_PER_SET - 1) {
          set({ rapidFireQuestionIndex: rapidFireQuestionIndex + 1 });
          return;
        }

        // End of set
        set({
          answeredQuestions: [...answeredQuestions, selectedQuestion],
          selectedQuestion: null,
          rapidFireQuestionIndex: 0,
        });

        const selectIndex = currentRoundFlow.indexOf("select");
        if (selectIndex !== -1) {
          set({ currentFlowIndex: selectIndex });
        }
        return;
      }

      // 🔁 Sequential rounds (no select step)
      if (!currentRoundFlow.includes("select")) {
        const total = ROUND_CONFIGS[currentRound]?.totalQuestions ?? 0;
        const next = sequentialCount + 1;

        if (next >= total) {
          get().goToMenu();
          return;
        }

        set({ sequentialCount: next });
        return;
      }

      // ✅ Normal selectable rounds
      if (selectedQuestion) {
        set({
          answeredQuestions: [...answeredQuestions, selectedQuestion],
          selectedQuestion: null,
        });
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

  previousInRound: () => {
    const { currentFlowIndex } = get();
    if (currentFlowIndex > 0) {
      set({ currentFlowIndex: currentFlowIndex - 1 });
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
