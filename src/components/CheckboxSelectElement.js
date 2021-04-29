import React from "react";
import { manageGroupCheckboxes, saveData, formattingResFromRef } from "../utils/utils";
/**
 * Check single item management
 * @param {integer} props.i
 * @param {object} props.item
 * @param {array} props.selectGroup
 * @param {array} props.checkbox
 * @param {function} props.setresult
 * @param {array} props.previous
 * @param {function} props.setprevious
 * @param {string} props.group
 * @returns
 */
export default function CheckboxSelectElement(props) {
  const { i: i, item: item, selectGroup: selectGroup, checkbox: checkbox, setresult: setresult, previous: previous, setprevious: setprevious, group: group } = props;

  /**
   * It manages checkbox items button (input checkbox)
   */
  const handleCheckChildElement = () => {
    let data = previous.data;
    //this function manages when you manually select single items or you deselect ones after a select all
    manageGroupCheckboxes(data, selectGroup.current);
    //save data to show in header
    setresult(formattingResFromRef(checkbox.current));
  };

  return (
    <li key={i}>
      <input type="checkbox" name={group} value={item.filterValue} onChange={handleCheckChildElement} /> {item.filterValue}
    </li>
  );
}
