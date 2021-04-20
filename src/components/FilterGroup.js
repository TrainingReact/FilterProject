import { SUB_SELECT_ALL } from "../data/Data";
import React from "react";
import ViewSubFilterItem from "./ViewSubFilterItem";
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
  //this variable helps to save current filter name and filter group name.
  let filterInfo = { filterName: "", filterGroup: "" };
  //if select group is available, set canBeSelect to true.
  SUB_SELECT_ALL.map((element) => {
    if (element.filterGroup === groupName) {
      return (canBeSelect = true), (filterInfo.filterName = element.filterName), (filterInfo.filterGroup = element.filterGroup);
    }
  });
  //if canBeSelect is true you can see select group checkbox
  return (
    <div className={"sub-filter-container "}>
      {canBeSelect ? (
        <span>
          <CheckboxSelectGroup arrayData={arr} filterName={filterInfo.filterName} filterGroup={filterInfo.filterGroup} />
        </span>
      ) : (
        <ViewSubFilterItem arr={arr} />
      )}
    </div>
  );
}
