import React, { useState, useMemo } from "react";
import FilterBody from "./FilterBody";
import FilterHeader from "./FilterHeader";
import FilterResults from "./FilterResults";
/**
 * Filter container component
 * @param {boolean} props.isSelected
 * @returns
 */
export default function FilterContainer(props) {
  const { isSelected: isSelected } = props;
  //the state manage select all checked
  const [all, setAll] = useState(false);
  //TODO: AGGIUNGI UN CONTEXT QUI CHE SI PRENDE ALL IN MODO DA FARLO ARRIVARE A CHECKBOXSELECTGROUP. IN QUESTO MODO PUOI GESTIRE L'ALL
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
      <FilterBody setresult={setFilterres} />
    </div>
  );
}
