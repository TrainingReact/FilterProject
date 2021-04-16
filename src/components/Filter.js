import React from "react";
/* import ButtonFilter from "./ButtonFilter"; */
import FilterContainer from "./FilterContainer";
/* import useFilter from "../hooks/useFilter"; */

/**
 * This is the overall filter component.
 * FilterHeader is the select all option.
 * FilterBody manages the filter groups
 * @returns
 */
export default function Filter() {
  /*   const { isShowing, toggle } = useFilter(); */
  return (
    <div className="filter">
      <div className="select-option-filter">
        <span className="title-filter-container">
          {" "}
          <h3>Filter</h3>
        </span>
        {/*   <span className="botton-filter-container" onClick={toggle}>
          <ButtonFilter />
        </span> */}
      </div>
      {/* <FilterContainer isShowing={isShowing} hide={toggle} /> */}
      <FilterContainer />
    </div>
  );
}
