import React from "react";
import { useStateValue } from "./State";
import Visualizer from "./Visualizer";

export default function Content() {
  const { state } = useStateValue();

  return <Visualizer tokens={state.tokens} />;
}
