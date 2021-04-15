import { SUB_SELECT_ALL } from "../data/Data";
import React from "react";
import ViewSubFilterItem from "../utils/ViewSubFilterItem";
import CheckboxSelectGroup from "./CheckboxSelectGroup";
/**
 * The component manage filter groups
 * @param {string} props.groupName
 * @param {array} props.array
 * @returns
 */
export default function FilterGroup(props) {
  const { groupName: groupName, arr: arr } = props;
  //this local variable is false in case of a "select group" is not available by SUB_SELECT_ALL.
  //Otherwise, it is set to true if the select group is available.
  let canBeSelect = false;
  //this variable helps to save current filter name.
  let filterName = "";
  //if select group is available, set canBeSelect to true.
  SUB_SELECT_ALL.map((element) => {
    if (element.filterGroup === groupName) {
      return (canBeSelect = true), (filterName = element.filterName);
    }
  });
  //if canBeSelect is true you can see select group checkbox
  return canBeSelect ? (
    <div className={"sub-filter-container "}>
      <CheckboxSelectGroup arrayData={arr} filterName={filterName} />
    </div>
  ) : (
    <div className="sub-filter-container">
      <ViewSubFilterItem arrayData={arr} />
    </div>
  );
}
