import React from "react";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { StateProvider } from "./State";
import Content from "./Content";
import {defaultTheme} from "./theme";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
        <StateProvider>
          <Content></Content>
        </StateProvider>
    </ThemeProvider>
  );
}

export default App;
