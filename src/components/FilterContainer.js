import React, { useState, useMemo, useEffect } from "react";
import FilterBody from "./FilterBody";
import FilterHeader from "./FilterHeader";
import FilterResults from "./FilterResults";

export default function FilterContainer(props) {
  const { isSelected: isSelected } = props;
  //the state manage select all checked
  const [all, setAll] = useState(false);
  //TODO: AGGIUNGI UN CONTEXT QUI CHE SI PRENDE ALL IN MODO DA FARLO ARRIVARE A CHECKBOXSELECTGROUP. IN QUESTO MODO PUOI GESTIRE L'ALL
  //the function allows to change class (button)
  const styleClass = useMemo(() => (isSelected ? "checkbox-select-group-on" : "checkbox-select-group-off"), [isSelected]);
  const [filterres, setfilterres] = useState([]);
  console.log("filterres", filterres);
  return (
    <div className="filter-body-container" className={styleClass}>
      <div className="filter-results">
        <FilterResults value={filterres} />
      </div>
      <FilterHeader setAll={setAll} />
      <FilterBody setresult={setfilterres} />
    </div>
  );
}
