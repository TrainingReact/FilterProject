import React, { useRef, useState, useMemo, useEffect } from "react";
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

  //ALL USE REF
  //checkbox items select group ref
  const checkbox = useRef([]);
  //checkbox select group ref
  const selectGroup = useRef([]);

  //FORMAT DATA TO INIZIALIZE USESTATE
  //it add ischecked property for every sub filter value to set the state with updated data
  const newData = addIsCheckedToSubFilterData(arrayData);

  //ALL USESTATE
  //the useState is used to restore the previous checkboxes configuration. At initial step, it is equal to current data
  const [previous, setprevious] = useState({ data: newData });
  //the isSelected useState is used to save the visibility after click button
  const [isSelected, setIsSelected] = useState(false);
  //check the situation in which the previous state have all false checked and now we have all
  //true checked
  const [checkAllSelect, setcheckAllSelect] = useState(false);

  //ALL FUNCTIONS
  //the function allows to manage filter visibility after button click
  const open = () => {
    isSelected ? setIsSelected(false) : setIsSelected(true);
  };
  //the function allows to change class (button)
  const styleClass = useMemo(() => (isSelected ? "checkbox-select-group-on" : "checkbox-select-group-off"), [isSelected]);
  //the function manage sub filter value checked and save the actual checked/unchecked
  //items configuration. The result is saved into previuos/setprevious useState to allow to restore
  //data in case of select group unchecked.
  const handleCheckChildElement = (event) => {
    let data = previous.data;
    //find who is checked and save in data
    data.forEach((element) => {
      if (element.filterValue === event.target.value) {
        element.isChecked = event.target.checked;
      }
      setr(whatIsCheckedByUser(data));
    });
    //if all checkboxes are selected manually (without select group button)
    //but the precedent state is all "isChecked === false", I have to restore the
    //the previous state with the current checkboxes checked. Otherwise, if I deselect
    //an item, the previous state is setted to all unchecked, so it lost the current value.
    //NB. you have to manage this only if the checkbox group exists (for this reason you have to
    //check canbeselect)
    if (canBeSelect) {
      if (checkAllSelect) {
        data.forEach((element, index) => {
          element.isChecked = checkbox.current[index].checked;
        });
        setr(whatIsCheckedByUser(data));
      }
      if (check(checkbox.current, true)) {
        setr(whatIsCheckedByUser(data));
        data.forEach((element) => {
          element.isChecked = false;
        });
      }
    }
    //save actual check/uncheck to restore
    setprevious({
      data: data,
    });
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
      data.map((element, key) => {
        filterChoosen.push({ filterName: filterName, filterValue: element.filterValue, isChecked: element.isChecked });
        return (checkbox.current[key].checked = element.isChecked);
      });
      //check all because you have checked "select group"
    } else if (event.target.checked) {
      checkbox.current.forEach((el) => {
        el.checked = true;
        filterChoosen.push({ filterName: filterName, filterValue: el.value, isChecked: el.checked });
      });
      //if all current checkboxes are selected and the previous state shows that they were not selected,
      //set checkAllSelect to true (this situation is handled in handleCheckChildElement)
      const isAllSelected = check(checkbox.current, true);
      const previousNotSelected = check(data, false);
      if (isAllSelected && !previousNotSelected) {
        setcheckAllSelect(true);
      }
    }
    setr(whatIsCheckedByUser(filterChoosen));
  };

  //manage the situation in which you select all the subitems or unselect one
  useEffect(() => {
    check(checkbox.current, true) ? (selectGroup.current.checked = true) : (selectGroup.current.checked = false);
  }, [handleCheckChildElement]);

  return (
    <div>
      <div className="sub-filter-container">
        <div className="checkbox-select-group">
          {canBeSelect ? (
            <input type="checkbox" name="selectAll" ref={selectGroup} onChange={handleAllChecked} value="checkedall" />
          ) : (
            <span>
              <input type="checkbox" className="hidden"></input>
            </span>
          )}
          <label>
            <h4>{filterGroup}</h4>
          </label>
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
