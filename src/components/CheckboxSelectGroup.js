import React, { useRef, useState, useMemo, useEffect, useContext, useReducer, useCallback } from "react";
import ButtonFilter from "./ButtonFilter";
import { check, addIsCheckedToSubFilterData, addIsCheckedToSubFilterObjectData, whatIsCheckedByUser } from "../utils/utils";
import { SubSelectallContext } from "../components/Filter";

export default function CheckboxSelectGroup(props) {
  const { setresult: setresult, totalData: totalData } = props;
  const SubSelall = useContext(SubSelectallContext);
  //it add ischecked property for every sub filter value to set the state with updated data
  const newTotalData = addIsCheckedToSubFilterObjectData(totalData);

  //the useState is used to restore the previous checkboxes configuration. At initial step, it is equal to current data
  const [previous, setprevious] = useState({ data: newTotalData });
  //the isSelected useState is used to save the visibility after click button
  const [isSelected, setIsSelected] = useState(false);

  //checkbox items select group ref
  const checkbox = useRef([]);
  //checkbox select group ref
  const selectGroup = useRef([]);

  //the function allows to manage filter visibility after button click
  const open = () => {
    isSelected ? setIsSelected(false) : setIsSelected(true);
  };
  //the function allows to change class (button)
  const styleClass = useMemo(() => (isSelected ? "checkbox-select-group-on" : "checkbox-select-group-off"), [isSelected]);

  const handleCheckChildElement = (event) => {
    let data = previous.data;
    data.forEach((element) => {
      Object.entries(element).map(([group, items]) => {
        items.forEach((a, i) => {
          if (a.filterValue === event.target.value) {
            a.isChecked = event.target.checked;
          }
        });
      });
    });
    //save actual check/uncheck to restore
    setprevious({
      data: data,
    });

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
  };

  //manage the situation in which you select all the subitems or unselect one
  /*   useEffect(() => {
    previous.data.map((elem) => {
      return Object.entries(elem).map(([group, items]) => {
        let isAllChecked = check(items, true);
        if (isAllChecked) {
          selectGroup.current.map((sel) => {
            if (sel.value === group) {
              sel.checked = true;
            }
          });
        } else {
          selectGroup.current.map((sel) => {
            if (sel.value === group) {
              sel.checked = false;
            }
          });
        }
      });
    });
  }, [previous, setprevious]);
 */
  //the function manage the select group selection. if select group is checked then
  //all the sub filter items must be checked. Otherwise, if select group is unchecked
  //then it restores the items to the previous state.
  const handleAllChecked = (event) => {
    //it is a supporting array to save the actual checked values (useful to set filterres)
    let filterChoosen = [];
    let pippo;
    if (event.target.checked) {
      Object.entries(checkbox.current).map(([i, items]) => {
        if (i === event.target.value) {
          for (let j = 0; j < items.childNodes.length; j++) {
            items.childNodes[j].children[0].checked = true;
          }
        }
      });
    } else {
      Object.entries(checkbox.current).map(([i, items]) => {
        if (i === event.target.value) {
          previous.data.map((prev) => {
            Object.entries(prev).map(([k, prevElem]) => {
              if (k === event.target.value) {
                let areAllChecked = check(prevElem, true);
                if (!areAllChecked) {
                  for (let j = 0; j < items.childNodes.length; j++) {
                    items.childNodes[j].children[0].checked = prevElem[j].isChecked;
                  }
                } else {
                  for (let j = 0; j < items.childNodes.length; j++) {
                    items.childNodes[j].children[0].checked = false;
                  }
                }
              }
            });
          });
        }
      });
    }
  };
  return (
    <div className="sub-filter-container">
      {newTotalData.map((element, index) => {
        {
          return Object.entries(element).map(([group, items]) => {
            return (
              <span key={group}>
                <div className="checkbox-select-group">
                  {SubSelall.map((checkPresent, i) => {
                    if (checkPresent.filterGroup === group) {
                      return (
                        <input key={i} type="checkbox" name="selectAll" value={checkPresent.filterGroup} ref={(el) => (selectGroup.current[i] = el)} onChange={handleAllChecked} />
                      );
                    } else {
                      return <input key={i} type="checkbox" className="hidden"></input>;
                    }
                  })}

                  <label>
                    <h4>{group}</h4>
                  </label>
                  {/* <ButtonFilter func={open} isSelected={isSelected} /> */}
                </div>
                <ul key={group} className={"list "} name={group} ref={(el) => (checkbox.current[group] = el)}>
                  {items.map((item, i) => {
                    return (
                      <li key={i}>
                        <input type="checkbox" name={group} value={item.filterValue} onChange={handleCheckChildElement} /> {item.filterValue}
                      </li>
                    );
                  })}
                </ul>
              </span>
            );
          });
        }
      })}
    </div>
  );
}
