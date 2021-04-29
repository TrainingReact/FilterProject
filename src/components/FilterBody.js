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
  const { setresult: setresult, allIsSelected: allIsSelected } = props;
  return (
    <div className="filter-body">
      <FilterGroup arr={data} setresult={setresult} />
    </div>
  );
}
