import React, { createContext, useState } from "react";
import FilterContainer from "./FilterContainer";
import ButtonFilter from "./ButtonFilter";

import { DATA, SUB_SELECT_ALL } from "../data/Data";
export const DataContext = React.createContext(DATA);
export const SubSelectallContext = createContext(SUB_SELECT_ALL);

/**
 * This is the overall filter component.
 * FilterHeader is the select all option.
 * FilterBody manages the filter groups
 * @returns
 */
export default function Filter() {
  //the isSelected useState is used to save the visibility after click button
  const [isSelected, setIsSelected] = useState(false);
  //the function allows to manage filter visibility after button click
  const open = () => {
    isSelected ? setIsSelected(false) : setIsSelected(true);
  };

  return (
    <div className="filter">
      <div className="select-option-filter">
        <span className="title-filter-container">
          {" "}
          <h2>Filter</h2>
        </span>
        <span className="primary-button">
          {" "}
          <ButtonFilter func={open} isSelected={isSelected} />
        </span>
      </div>
      <DataContext.Provider value={DATA}>
        <SubSelectallContext.Provider value={SUB_SELECT_ALL}>
          <FilterContainer isSelected={isSelected} />
        </SubSelectallContext.Provider>
      </DataContext.Provider>
    </div>
  );
}
