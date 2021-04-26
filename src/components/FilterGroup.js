import React, { useContext, useMemo, useEffect, useState } from "react";
import CheckboxSelectGroup from "./CheckboxSelectGroup";
/**
 * The component manage filter groups
 * @param {string} props.groupName
 * @param {array} props.array
 * @returns
 */
export default function FilterGroup(props) {
  const { arr: arr, setresult: setresult } = props;
  return (
    <div className={"sub-filter-container "}>
      <span>
        {/*  {Object.entries(arr).map(([key, value]) => { */}
        <CheckboxSelectGroup totalData={arr} setresult={setresult} />;{/*  })} */}
      </span>
    </div>
  );
}
