import FilterGroup from "../components/FilterGroup";
import React, { useContext } from "react";
import { DataContext } from "../components/Filter";

/**
 * The component represents the overall filter body.
 * In particular, this is the filter groups container
 * @returns
 */
export default function FilterBody(props) {
  const data = useContext(DataContext);
  const { setr1: setr1, setr2: setr2, setr3: setr3 } = props;
  const filterGroupOne = data.filterGroupOne;
  const filterGroupTwo = data.filterGroupTwo;
  const filterGroupThree = data.filterGroupThree;
  return (
    <div className="filter-body">
      <FilterGroup groupName={"filterGroupOne"} arr={filterGroupOne} setr={setr1} />
      <FilterGroup groupName={"filterGroupTwo"} arr={filterGroupTwo} setr={setr2} />
      <FilterGroup groupName={"filterGroupThree"} arr={filterGroupThree} setr={setr3} />
    </div>
  );
}
