import React from "react";
export default function ButtonFilter(props) {
  const { isSelected: isSelected, func: func } = props;
  return isSelected ? <button onClick={func}>&#9660; </button> : <button onClick={func}>&#9650; </button>;
}

//
