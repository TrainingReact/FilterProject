import React from "react";
import FilterBody from "./FilterBody";
import FilterHeader from "./FilterHeader";
/* import ButtonProva from "../stories/ButtonProva";
import { DATA } from "../data/Data"; */
export default function Filter() {
  return (
    <div className="filter">
      <h3>Filter</h3>
      <FilterHeader />
      <FilterBody />
      {/* <ButtonProva variant={"primary"} children={"prova storybook"} data={DATA} /> */}
    </div>
  );
}
