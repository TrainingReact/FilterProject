import React, { useRef, useState } from "react";
import ViewSubFilterItem from "../utils/ViewSubFilterItem";

/**
 * the component manage the case in which select group checkbox is available from SUB_SELECT_ALL
 * @param {array} props.arrayData
 * @param {string} props.filterName
 * @returns
 */
export default function CheckboxSelectGroup(props) {
  const { arrayData: arrayData, filterName: filterName } = props;
  //checkbox select group ref
  const checkbox = useRef();
  //this use State helps to keep track of checked/unchecked
  const [isChecked, setIsChecked] = useState(false);
  //this function set state according to checked/unchecked select group checkbox
  const check = () => {
    if (checkbox.current.checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };
  return (
    <div className={"sub-filter-container "}>
      <input type="checkbox" ref={checkbox} name="selectAll" onChange={check} />
      <label>{filterName}</label>
      <ViewSubFilterItem arrayData={arrayData} isChecked={isChecked} />
    </div>
  );
}
