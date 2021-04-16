import React, { useRef, useState, useEffect, useCallback } from "react";
import { SUB_SELECT_ALL } from "../data/Data";
import ViewSubFilterItem from "../utils/ViewSubFilterItem";

/**
 * the component manage the case in which select group checkbox is available from SUB_SELECT_ALL
 * @param {array} props.arrayData
 * @param {string} props.filterName
 * @returns
 */
export default function CheckboxSelectGroup(props) {
  const { arrayData: arrayData, filterName: filterName, filterGroup: filterGroup } = props;
  //checkbox select group ref
  const checkbox = useRef();
  //this use State save the correct sub select all with checked modified
  const [find, setfind] = useState();
  //this function set state according to checked/unchecked select group checkbox
  const check = useCallback(() => {
    let selectGroup = SUB_SELECT_ALL.find((group) => (group.filterGroup = filterGroup));
    selectGroup.checked = !selectGroup.checked;
    setfind(selectGroup);
  }, []);
  return (
    <div className={"sub-filter-container "}>
      <input type="checkbox" ref={checkbox} name="selectAll" onChange={check} />
      <label>{filterName}</label>
      <ViewSubFilterItem arrayData={arrayData} mySubSelectAllGroup={find} />
    </div>
  );
}
