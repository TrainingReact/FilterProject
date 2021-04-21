import React, { useState } from "react";
import FilterBody from "./FilterBody";
import FilterHeader from "./FilterHeader";
import FilterResults from "./FilterResults";

export default function FilterContainer() {
  const [pippo, setpippo] = useState("");
  const [filterres1, setfilterres1] = useState([{ filterName: "", filterValue: "", isChecked: false }]);
  const [filterres2, setfilterres2] = useState([{ filterName: "", filterValue: "", isChecked: false }]);
  const [filterres3, setfilterres3] = useState([{ filterName: "", filterValue: "", isChecked: false }]);
  return (
    <div className="filter-body-container">
      <div className="filter-results">
        <FilterResults value={filterres1} />
        <FilterResults value={filterres2} />
        <FilterResults value={filterres3} />
      </div>
      <FilterHeader />
      <FilterBody setr1={setfilterres1} setr2={setfilterres2} setr3={setfilterres3} />
    </div>
  );
}
