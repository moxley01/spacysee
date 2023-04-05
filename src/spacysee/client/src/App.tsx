import React from "react";
import "./App.css";
import { useStateValue } from "./State";
import Visualizer from "./components/Visualizer";

function App() {
    const { state } = useStateValue();

    return <Visualizer sentences={state.sentences} />;
}

export default App;
