import { useState } from "react";
import { createContainer } from "react-tracked";

const today = new Date();
const initialState = {
  currentView: "week",
  currentDate: today,
  isDetailOpen: false,
  selectedData: null,
};

const useMyState = () => useState(initialState);
export const { Provider: SharedStateProvider, useTracked: useSharedState } =
  createContainer(useMyState);
