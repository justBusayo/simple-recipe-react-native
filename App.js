import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreContextProvider from "./store/StoreContext";
import Main from "./Main";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <StoreContextProvider>
      <Main />
    </StoreContextProvider>
  );
}
