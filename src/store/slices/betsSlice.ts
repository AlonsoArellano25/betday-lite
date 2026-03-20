import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bet } from "@/types";

type BetsState = {
  simulatedBets: Bet[];
  hydrated: boolean;
};

const initialState: BetsState = {
  simulatedBets: [],
  hydrated: false
};

const betsSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    hydrateBets(state, action: PayloadAction<Bet[]>) {
      state.simulatedBets = action.payload;
      state.hydrated = true;
    },
    addSimulatedBet(state, action: PayloadAction<Bet>) {
      state.simulatedBets = [action.payload, ...state.simulatedBets];
    }
  }
});

export const { hydrateBets, addSimulatedBet } = betsSlice.actions;
export default betsSlice.reducer;
