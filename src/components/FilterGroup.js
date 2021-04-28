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
  const [classItemsState, setClassItemsState] = useState([{ group: "", click: false, classname: "list checkbox-select-group-off" }]);

  useEffect(() => {
    let arraySetst = Object.entries(arr).map(([ind, element]) => {
      return {
        group: ind,
        click: false,
        classname: "list checkbox-select-group-off",
      };
    });
    setClassItemsState(arraySetst);
  }, []);
  return (
    <div className={"sub-filter-container "}>
      <span>
        <CheckboxSelectGroup classItemsState={classItemsState} setClassItemsState={setClassItemsState} totalData={arr} setresult={setresult} />
      </span>
    </div>
  );
}
