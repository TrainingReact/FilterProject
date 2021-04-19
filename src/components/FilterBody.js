import FilterGroup from "../components/FilterGroup";
import React, { useContext } from "react";
import { DataContext } from "../App";
/**
 * The component represents the overall filter body.
 * In particular, this is the filter groups container
 * @returns
 */
export default function FilterBody() {
  const data = useContext(DataContext);
  const filterGroupOne = data.filterGroupOne;
  const filterGroupTwo = data.filterGroupTwo;
  const filterGroupThree = data.filterGroupThree;
  return (
    <div className="filter-body">
      <FilterGroup groupName={"filterGroupOne"} arr={filterGroupOne} />
      <FilterGroup groupName={"filterGroupTwo"} arr={filterGroupTwo} />
      <FilterGroup groupName={"filterGroupThree"} arr={filterGroupThree} />
    </div>
  );
}
