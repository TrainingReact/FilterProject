import FilterGroup from "../components/FilterGroup";
import { DATA } from "../data/Data";
import React from "react";
/**
 * The component represents the overall filter body.
 * In particular, this is the filter groups container
 * @returns
 */
export default function FilterBody() {
  const filterGroupOne = DATA.filterGroupOne;
  const filterGroupTwo = DATA.filterGroupTwo;
  const filterGroupThree = DATA.filterGroupThree;
  return (
    <div className="filter-body">
      <FilterGroup groupName={"filterGroupOne"} arr={filterGroupOne} />
      <FilterGroup groupName={"filterGroupTwo"} arr={filterGroupTwo} />
      <FilterGroup groupName={"filterGroupThree"} arr={filterGroupThree} />
    </div>
  );
}
