import React from "react";
import { SELECT_ALL } from "../data/Data";
/**
 * This component is referred to select all checkbox
 * If you want to remove select all option, remove FilterHeader from Filter.js
 * @returns
 */
export default function FilterHeader(props) {
  const { setAll: setAll } = props;
  const handleSelectallChange = (event) => {
    setAll(event.target.checked);
  };
  return (
    <div className="filter-header">
      <input type="checkbox" onChange={handleSelectallChange} name="selectAll" />
      <label> {SELECT_ALL.filterName} </label>
    </div>
  );
}
