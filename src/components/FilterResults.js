import React from "react";
/**
 * The component allows to show the selected items
 * @param {array} props
 * @returns
 */
export default function FilterResults(props) {
  const { value: elementChoosen } = props;

  return (
    <div>
      {elementChoosen.map((element, index) => {
        if (element.isChecked) {
          return <span key={index}>{element.filterValue + "  "}</span>;
        }
      })}
    </div>
  );
}
