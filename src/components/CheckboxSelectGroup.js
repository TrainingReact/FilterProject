import React, { useRef, useState, useMemo, useEffect, useCallback } from "react";
import ButtonFilter from "./ButtonFilter";
import { check, addIsCheckedToSubFilterData } from "../utils/utils";
/**
 * the component manage the case in which select group checkbox is available from SUB_SELECT_ALL
 * @param {array} props.arrayData
 * @param {string} props.filterName
 * @param {string} props.filterGroup
 * @returns
 */
export default function CheckboxSelectGroup(props) {
  const { arrayData: arrayData, filterName: filterName, filterGroup: filterGroup } = props;
  //checkbox items select group ref
  const checkbox = useRef([]);
  //it add ischecked property for every sub filter value to set the state with updated data
  const newData = addIsCheckedToSubFilterData(arrayData);
  //the useState is used to restore the previous checkboxes configuration
  const [previous, setprevious] = useState({ data: newData });
  //the useState is used to save the visibility after click button
  const [isSelected, setIsSelected] = useState(false);
  //the function allows to manage filter visibility after button click
  const open = () => {
    isSelected ? setIsSelected(false) : setIsSelected(true);
  };
  //the function allows to change class (button)
  const styleClass = useMemo(() => (isSelected ? "checkbox-select-group-on" : "checkbox-select-group-off"), [isSelected]);
  //checkbox select group ref
  const selectGroup = useRef([]);
  const [thisstate, setthisstate] = useState({ data: newData });

  //the function manage sub filter value checked and save the actual checked/unchecked
  //items configuration to allow to restore data in case of select group unchecked.
  const handleCheckChildElement = (event) => {
    let data = previous.data;
    //find who is checked and save in data
    data.forEach((element) => {
      if (element.filterValue === event.target.value) {
        element.isChecked = event.target.checked;
      }
    });
    //save actual check/uncheck to restore
    setprevious({
      data: data,
    });
    setthisstate({
      data: data,
    });
  };

  //the function manage the select group selection. if select group is checked then
  //all the sub filter items must be checked. Otherwise, if select group is unchecked
  //then it restores the items to the previous state.
  const handleAllChecked = (event) => {
    let data = previous.data;
    let appoggio = [{}];
    //restore previous state
    if (event.target.checked === false) {
      data.map((element, key) => {
        // appoggio.push(element);
        return (checkbox.current[key].checked = element.isChecked);
      });
      //check all
    } else if (event.target.checked === true) {
      checkbox.current.forEach((el) => {
        el.checked = true;
        appoggio.push({ filterName: "", filterValue: el.value, isChecked: el.checked });
      });
      setthisstate({
        data: appoggio,
      });
    }
  };

  useEffect(() => {
    const ckbox = checkbox.current;
    const result = check(ckbox);
    if (result.length === ckbox.length) {
      selectGroup.current.checked = true;
    } else {
      selectGroup.current.checked = false;
    }
  }, [handleCheckChildElement]);

  useEffect(() => {
    const ggg = thisstate.data.filter((el) => {
      return el.isChecked === true;
    });
  }, [checkbox, handleCheckChildElement, handleAllChecked]);

  return (
    <div className="sub-filter-container">
      <div className="checkbox-select-group">
        <input type="checkbox" name="selectAll" ref={selectGroup} onChange={handleAllChecked} value="checkedall" />
        <label>{filterGroup}</label>
        <ButtonFilter func={open} isSelected={isSelected} />
      </div>
      <ul className={"list " + styleClass}>
        {previous.data.map((item, index) => {
          return (
            <li key={index}>
              <input key={index} ref={(el) => (checkbox.current[index] = el)} onChange={handleCheckChildElement} type="checkbox" value={item.filterValue} /> {item.filterValue}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
