import React from "react";
import "./App.scss";
import BubbleSort from "./components/BubbleContainer/BubbleContainer";

function App() {
  return (
    <div className="app">
      <div className="sorts-container">
        <BubbleSort></BubbleSort>
      </div>
    </div>
  );
}

export default App;
