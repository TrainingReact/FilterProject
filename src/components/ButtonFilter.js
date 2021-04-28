import React, { useState } from "react";
export default function ButtonFilter(props) {
  const { isSelected: isSelected, setIsSelected: setIsSelected } = props;
  const [classn, setClassn] = useState("arrow up");
  //the function allows to manage filter visibility after button click
  const open = () => {
    isSelected ? setIsSelected(false) : setIsSelected(true);
    isSelected ? setClassn("arrow up") : setClassn("arrow down");
  };
  return <button className={classn} onClick={open}></button>;
}
