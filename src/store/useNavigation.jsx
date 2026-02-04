import { create } from "zustand";
import { ROUND_CONFIGS } from "../constants/roundConfig";

const initialRoundState = {
  currentRound: null,
  currentRoundFlow: [],
  currentFlowIndex: 0,
  selectedQuestion: null,
  sequentialCount: 1,
  currentSubjectId: null
};

export const useNavigationStore = create((set, get) => ({
  // --------------------
  // Global navigation
  // --------------------
  currentPage: "welcome", // welcome | intro | poster | rules | menu | round

  ...initialRoundState,
  answeredQuestions: {},
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

    set({
      currentPage: "round",
      currentRound: roundKey,
      currentRoundFlow: config.flow,
      currentFlowIndex: 0,
      sequentialCount: 1,
      selectedQuestion: null,
      currentSubjectId: null,
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
      sequentialCount,
      currentSubjectId,
      answeredQuestions,
      goToMenu
    } = state;

    const step = currentRoundFlow[currentFlowIndex];

    // --------------------
    // Guards
    // --------------------
    if (step === "select" && !selectedQuestion) return;
    if (step === "subselection" && !currentSubjectId) return;

    // --------------------
    // Sequential rounds
    // --------------------
    if (
      (currentRound === "quickResponse" || currentRound === "open") &&
      step === "question"
    ) {
      if (sequentialCount < ROUND_CONFIGS[currentRound].totalQuestions) {
        set({ sequentialCount: sequentialCount + 1 });
      } else {
        goToMenu();
        return;
      }
    }

    // --------------------
    // Save Answered Question
    // --------------------
    if (step === "question" && selectedQuestion) {

      // ---------- ELIMINATION ----------
      if (currentRound === "elimination1" || currentRound == "elimination2") {

        const subjectAnswers =
          answeredQuestions[currentRound]?.[currentSubjectId] || [];

        set({
          answeredQuestions: {
            ...answeredQuestions,
            [currentRound]: {
              ...answeredQuestions[currentRound],
              [currentSubjectId]: [...subjectAnswers, selectedQuestion],
            }
          },
          selectedQuestion: null
        });

      }

      // ---------- NORMAL ROUNDS ----------
      else {

        const roundAnswers = answeredQuestions[currentRound] || [];

        set({
          answeredQuestions: {
            ...answeredQuestions,
            [currentRound]: [...roundAnswers, selectedQuestion]
          },
          selectedQuestion: null
        });

      }
    }

    // --------------------
    // Flow Navigation
    // --------------------
    if (currentFlowIndex < currentRoundFlow.length - 1) {
      set({ currentFlowIndex: currentFlowIndex + 1 });
    } else {

      if (currentRound.startsWith("elimination")) {
        const subSelectIndex = currentRoundFlow.indexOf("subselection");
        set({ currentFlowIndex: subSelectIndex, currentSubjectId: undefined });
        return;
      }

      const selectIndex = currentRoundFlow.indexOf("select");
      const questionIndex = currentRoundFlow.indexOf("question");

      set({
        currentFlowIndex:
          selectIndex !== -1 ? selectIndex : questionIndex,
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
  selectEliminationSubject: (subjectId) => {
    set({ currentSubjectId: subjectId })
  }
  ,
  goToSubSelection: () => {
    const { currentRoundFlow
    } = get()
    const subSelectIndex = currentRoundFlow.indexOf("subselection");
    set({ currentFlowIndex: subSelectIndex, currentSubjectId: undefined });
  },

  backToSelection: () => {
    const { currentRoundFlow, currentRound } = get();
    const selectIndex = currentRoundFlow.indexOf("select");
    if (selectIndex !== -1) {
      set({ 
        currentFlowIndex: selectIndex, 
        selectedQuestion: null,
        answeredQuestions: get().answeredQuestions // Preserve answered questions
      });
    }
  }
}));
