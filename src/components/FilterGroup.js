import { SUB_SELECT_ALL } from "../data/Data";
import React from "react";
import ViewSubFilterItem from "../utils/ViewSubFilterItem";
export default function FilterGroup(props) {
  const { groupName: groupName, arr: arr } = props;
  let canBeSelect = false;
  let filterName = "";
  SUB_SELECT_ALL.map((element) => {
    if (element.filterGroup === groupName) {
      return (canBeSelect = true), (filterName = element.filterName);
    }
  });
  return canBeSelect ? (
    <div className={"sub-filter-container "}>
      <input type="checkbox" name="selectAll" />
      <label>{filterName}</label>
      <ViewSubFilterItem arrayData={arr} />
    </div>
  ) : (
    <div className="sub-filter-container">
      <ViewSubFilterItem arrayData={arr} />
    </div>
  );
}
