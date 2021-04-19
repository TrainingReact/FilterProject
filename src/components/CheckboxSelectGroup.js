import React, { useRef, useState } from "react";

/**
 * the component manage the case in which select group checkbox is available from SUB_SELECT_ALL
 * @param {array} props.arrayData
 * @param {string} props.filterName
 * @param {string} props.filterGroup
 * @returns
 */
export default function CheckboxSelectGroup(props) {
  const { arrayData: arrayData, filterName: filterName } = props;
  //checkbox items select group ref
  const checkbox = useRef([]);
  //it add ischecked property for every sub filter value to set the state with updated data
  const newData = arrayData.map((element) => {
    return {
      ...element,
      isChecked: false,
    };
  });
  //the useState is used to restore the previous checkboxes configuration
  const [previous, setprevious] = useState(newData);
  const [a, seta] = useState(0);

  //the function manage sub filter value checked and save the actual checked/unchecked
  //items configuration to allow to restore data in case of select group unchecked.
  const handleCheckChildElement = (event) => {
    let data = previous;
    data.forEach((element) => {
      if (element.filterValue === event.target.value) {
        element.isChecked = event.target.checked;
      }
    });
    setprevious(data);
    seta(a + 1);
  };

  //the function manage the select group selection. if select group is checked then
  //all the sub filter items must be checked. Otherwise, if select group is unchecked
  //then it restores the items to the previous state.
  const handleAllChecked = (event) => {
    let data = previous;
    if (event.target.checked === false) {
      data.map((element, key) => {
        return (checkbox.current[key].checked = element.isChecked);
      });
    } else if (event.target.checked === true) {
      checkbox.current.forEach((el) => {
        el.checked = true;
      });
    }
  };

  return (
    <div className={"sub-filter-container "}>
      <input type="checkbox" name="selectAll" onChange={handleAllChecked} value="checkedall" />
      <label>{filterName}</label>
      <ul className="list">
        {previous.map((item, index) => {
          return (
            <li>
              {index}
              <input
                key={index}
                ref={(el) => (checkbox.current[index] = el)}
                onChange={handleCheckChildElement}
                type="checkbox"
                checked={item.isChecked}
                value={item.filterValue}
              />{" "}
              {item.filterValue}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
