import React from "react";
import { check, searchValue, formattingResFromData } from "../utils/utils";

export default function CheckboxSelectElement(props) {
  const { i: i, item: item, selectGroup: selectGroup, checkbox: checkbox, setresult: setresult, previous: previous, setprevious: setprevious, group: group } = props;

  const handleCheckChildElement = () => {
    let data = previous.data;
    //this code manage the situation in which after clicked check group you have to deselected one item.
    //To take current check/uncheck values, you should read all checkbox active in this moment.
    //So, "takecurrentchecked" store the actual values to put it in previous state.
    //PS. I tried to create formatted data taking checkbox.currents but
    //using Object.entries loop I obtained this kind of data: [{[{Array[1], Array[1],...},{Array[1], Array[1],...}]},
    //{ [{Array[1], Array[1],...}, {Array[1], Array[1],...}] },...] instead of [{ [{}, {}]}, { [{}, {}]}, { [{}, {}]}, ...]
    //this new kind of data added useless loop and it enlarges the code. It wasn't possible to correct this configuration data
    //due to Object.entries return so I choose this other solution:
    let takeCurrentChecked = [];
    Object.entries(checkbox.current).map(([i, items]) => {
      Object.entries(items.children).map(([indexLi, liElem]) => {
        return Object.entries(liElem.children).map(([indexInp, inputElem]) => {
          takeCurrentChecked.push({
            filterValue: inputElem.value,
            isChecked: inputElem.checked,
          });
        });
      });
    });
    //useful to modified data to set the new configuration checked/unchecked
    data.forEach((element) => {
      Object.entries(element).map(([i, items]) => {
        items.forEach((value) => {
          const currentValue = takeCurrentChecked.find((el) => searchValue(el, value.filterValue));
          return (value.isChecked = currentValue.isChecked);
        });
      });
    });
    //save actual check/uncheck to restore in other cases
    setprevious({
      data: data,
    });
    //this code manages when you manually select single items or you deselect ones after a select all
    data.map((elem) => {
      return Object.entries(elem).map(([group, items]) => {
        let isAllChecked = check(items, true);
        if (isAllChecked) {
          selectGroup.current.map((sel) => {
            if (sel.value === group) {
              sel.checked = true;
            }
          });
        } else if (!isAllChecked) {
          selectGroup.current.map((sel) => {
            if (sel.value === group) {
              sel.checked = false;
            }
          });
        }
      });
    });
    //save data to show in header
    setresult(formattingResFromData(data));
  };

  return (
    <li key={i}>
      <input type="checkbox" name={group} value={item.filterValue} onChange={handleCheckChildElement} /> {item.filterValue}
    </li>
  );
}
