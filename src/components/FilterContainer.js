import React, { useState, useMemo, createContext } from "react";
import FilterBody from "./FilterBody";
import FilterHeader from "./FilterHeader";
import FilterResults from "./FilterResults";
export const allCheckboxManagement = createContext();
/**
 * Filter container component
 * @param {boolean} props.isSelected
 * @returns
 */
export default function FilterContainer(props) {
  const { isSelected: isSelected } = props;
  //the state manage select all checked
  const [all, setAll] = useState(false);
  //the function allows to change class (button)
  const styleClass = useMemo(() => (isSelected ? "checkbox-select-group-on" : "checkbox-select-group-off"), [isSelected]);
  //the useState allows to save choosen values. The purpose is show
  //this values on filter result
  const [filterres, setFilterres] = useState([]);
  return (
    <div className="filter-body-container" className={styleClass}>
      <div className="filter-results">
        <FilterResults value={filterres} />
      </div>
      <FilterHeader setAll={setAll} />
      <allCheckboxManagement.Provider value={all}>
        <FilterBody setresult={setFilterres} />
      </allCheckboxManagement.Provider>
    </div>
  );
}
