import React, { useRef, useState, useMemo, useEffect, useCallback } from "react";
import ButtonFilter from "./ButtonFilter";
import { check, addIsCheckedToSubFilterData, whatIsCheckedByUser } from "../utils/utils";
/**
 * the component manage the case in which select group checkbox is available from SUB_SELECT_ALL
 * @param {array} props.arrayData
 * @param {string} props.filterName
 * @param {string} props.filterGroup
 * @returns
 */
export default function CheckboxSelectGroup(props) {
  const { arrayData: arrayData, filterName: filterName, filterGroup: filterGroup, canBeSelect: canBeSelect, setr: setr } = props;
  //checkbox items select group ref
  const checkbox = useRef([]);
  //it add ischecked property for every sub filter value to set the state with updated data
  const newData = addIsCheckedToSubFilterData(arrayData);
  //the useState is used to restore the previous checkboxes configuration. At initial step, it is equal to current data
  const [previous, setprevious] = useState({ data: newData });
  //the isSelected useState is used to save the visibility after click button
  const [isSelected, setIsSelected] = useState(false);
  //the function allows to manage filter visibility after button click
  const open = () => {
    isSelected ? setIsSelected(false) : setIsSelected(true);
  };
  //the function allows to change class (button)
  const styleClass = useMemo(() => (isSelected ? "checkbox-select-group-on" : "checkbox-select-group-off"), [isSelected]);
  //checkbox select group ref
  const selectGroup = useRef([]);

  //the function manage sub filter value checked and save the actual checked/unchecked
  //items configuration. The result is saved into previuos/setprevious useState to allow to restore
  //data in case of select group unchecked.
  const handleCheckChildElement = (event) => {
    let data = previous.data;

    //find who is checked and save in data
    data.forEach((element, index) => {
      if (element.filterValue === event.target.value) {
        element.isChecked = event.target.checked;
      }
    });
    //save actual check/uncheck to restore
    setprevious({
      data: data,
    });
    setr(whatIsCheckedByUser(data));
  };

  //the function manage the select group selection. if select group is checked then
  //all the sub filter items must be checked. Otherwise, if select group is unchecked
  //then it restores the items to the previous state.
  const handleAllChecked = (event) => {
    let data = previous.data;

    //it is a supporting array to save the actual checked values (useful to set filterres)
    let filterChoosen = [];
    //restore previous state because you have unchecked "select group"
    if (!event.target.checked) {
      //TODO: IN QUEST PUNTO se precedentemente è tutto checkato non mi deve tornare allo stato precedente ma ricontrollare il checkbox current e aggiornare di conseguenza
      data.map((element, key) => {
        filterChoosen.push({ filterName: "", filterValue: element.filterValue, isChecked: element.isChecked });
        return (checkbox.current[key].checked = element.isChecked);
      });
      //check all because you have checked "select group"
    } else if (event.target.checked) {
      checkbox.current.forEach((el) => {
        el.checked = true;
        filterChoosen.push({ filterName: "", filterValue: el.value, isChecked: el.checked });
      });
    }
    setr(whatIsCheckedByUser(filterChoosen));
  };

  //manage the situation in which you select all the subitems or unselect one
  useEffect(() => {
    const ckbox = checkbox.current;
    const result = check(ckbox);
    if (result.length === ckbox.length) {
      selectGroup.current.checked = true;
    } else {
      selectGroup.current.checked = false;
    }
  }, [handleCheckChildElement]);

  return (
    <div>
      <div className="sub-filter-container">
        <div className="checkbox-select-group">
          {canBeSelect ? <input type="checkbox" name="selectAll" ref={selectGroup} onChange={handleAllChecked} value="checkedall" /> : <span></span>}
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
    </div>
  );
}
