import { SliceInitialState } from "@/types";

export const setPending = (state: SliceInitialState, reducerName: string) => {
  console.log(`${reducerName} pending...`);
  state.isLoading = true;
  state.requestError = false;
  state.requestSuccess = false;
};

export const setFulfilled = (state: SliceInitialState, reducerName: string) => {
  console.log(`${reducerName} fulfilled.`);
  state.isLoading = false;
  state.requestError = false;
  state.requestSuccess = true;
};

export const setRejected = (state: SliceInitialState, reducerName: string) => {
  console.log(`${reducerName} rejected.`);
  state.isLoading = true;
  state.requestError = false;
  state.requestSuccess = false;
};
