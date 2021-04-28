import React, { useRef } from "react";

/**
 * The component manages the group button to show or hide the subfilter items
 * @param {string} props.group
 * @param {function} props.ClassItemsState
 * @param {array} props.checkbox
 * @param {function} props.setClassItemsState
 * @returns
 */
export default function ButtonGroup(props) {
  const { group: group, classItemsState: classItemsState, checkbox: checkbox, setClassItemsState: setClassItemsState } = props;
  //button ref
  const buttonRef = useRef([]);
  //the function allows to manage filter visibility after button click and chenge content button
  const open = (event) => {
    let actualButtonState = classItemsState;
    actualButtonState.forEach((el) => {
      if (el.group === event.target.value) {
        el.click = !el.click;
        el.click === true ? (el.classname = "list checkbox-select-group-on") : (el.classname = "list checkbox-select-group-off");
        el.click === true ? (buttonRef.current[event.target.value].className = "arrow down") : (buttonRef.current[event.target.value].className = "arrow up");
        checkbox[event.target.value].className = el.classname;
      }
    });
    setClassItemsState(actualButtonState);
  };
  return <button value={group} onClick={open} className="arrow up" ref={(el) => (buttonRef.current[group] = el)}></button>;
}
