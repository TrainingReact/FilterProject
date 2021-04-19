import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Filter from "./components/Filter";
import { DATA, SUB_SELECT_ALL } from "./data/Data";
export const DataContext = React.createContext(DATA);

function App() {
  return (
    <DataContext.Provider value={DATA}>
      <Filter />
    </DataContext.Provider>
  );
}

export default App;
