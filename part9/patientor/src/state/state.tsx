import React, { createContext, useContext, useReducer } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Patient, Diagnosis } from "../types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnoses: Map<string, Diagnosis>;
};

const initialState: State = {
  patients: {},
  diagnoses: new Map<string, Diagnosis>()
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
