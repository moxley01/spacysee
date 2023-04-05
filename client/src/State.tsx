import React, { createContext, useContext, useReducer } from "react";

type State = {
    sentences: IToken[][];
    language: string;
};
type Action = {
    type: "LOAD";
    state: State;
};

const initialState: State = {
    sentences: [],
    language: "en",
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

export const StateProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    React.useEffect(() => {
        if ((window as any).__onready) {
            (window as any).__onready(function (data: {
                sentences: IToken[][];
                language: string;
            }) {
                dispatch({
                    type: "LOAD",
                    state: {
                        sentences: data.sentences,
                        language: data.language,
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
