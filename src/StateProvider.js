import React, { createContext, useContext, useReducer } from "react";

// prepare data layer
export const StateContext = createContext();

// wrap app and provide data layar
export const StateProvider = ({ reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// pull information from data layer
export const useStateValue = () => useContext(StateContext);