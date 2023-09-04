import React, { createContext, useReducer } from "react";
import userStoreReducer, { userInitialState } from "./userStore";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [userStore, dispatchUser] = useReducer(
    userStoreReducer,
    userInitialState
  );

  return (
    <StoreContext.Provider
      value={{
        userStore: { data: userStore, dispatchUser: dispatchUser },
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
