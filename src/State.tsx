// set up a state provider

import React, { createContext, useContext, useReducer } from "react";

// prepare the data layer

type State = {
  tokens: any[];
};
type Action = {
  type: "LOAD";
  state: State;
};

const initialState: State = {
  tokens: [],
};

export const StateContext = createContext<{
  state: State;
  dispatch: (action: Action) => void;
}>({
  state: initialState,
  dispatch: () => {},
});

type Props = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "LOAD":
      return {
        ...state,
        ...action.state,
      };
    default:
      return state;
  }
}

// wrap our app and provide the data layer to every component

export const StateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  React.useEffect(() => {
    if ((window as any).__onready) {
      (window as any).__onready(function (tokens: any[]) {
        dispatch({
          type: "LOAD",
          state: {
            tokens,
          },
        });
      });
    }
  }, [dispatch]);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
