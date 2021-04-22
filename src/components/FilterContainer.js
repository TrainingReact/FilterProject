import React, { useState, useMemo } from "react";
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
  const [filterres1, setfilterres1] = useState([{ filterName: "", filterValue: "", isChecked: false }]);
  const [filterres2, setfilterres2] = useState([{ filterName: "", filterValue: "", isChecked: false }]);
  const [filterres3, setfilterres3] = useState([{ filterName: "", filterValue: "", isChecked: false }]);
  return (
    <div className="filter-body-container" className={styleClass}>
      <div className="filter-results">
        <FilterResults value={filterres1} />
        <FilterResults value={filterres2} />
        <FilterResults value={filterres3} />
      </div>
      <FilterHeader setAll={setAll} />
      <FilterBody setr1={setfilterres1} setr2={setfilterres2} setr3={setfilterres3} />
    </div>
  );
}
