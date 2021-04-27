import React, { useRef, useCallback, useEffect, useState, useMemo, useContext, useReducer } from "react";
import ButtonFilter from "./ButtonFilter"; //todo: sistema il bottone (ora ne hai 2....)
import { check, searchValue, addIsCheckedToSubFilterObjectData } from "../utils/utils";
import { SubSelectallContext } from "../components/Filter";

export default function CheckboxSelectGroup(props) {
  const { setresult: setresult, totalData: totalData, st: st, setst: setst } = props;
  const SubSelall = useContext(SubSelectallContext);
  //it add ischecked property for every sub filter value to set the state with updated data
  const newTotalData = addIsCheckedToSubFilterObjectData(totalData);
  //the useState is used to restore the previous checkboxes configuration. At initial step, it is equal to current data
  const [previous, setprevious] = useState({ data: newTotalData });
  //checkbox items select group ref
  const checkbox = useRef([]);
  //checkbox select group ref
  const selectGroup = useRef([]);
  //button ref (useful to change content but now seems not working...)
  //todo: content non funzina! magari chiedi perchè...
  const buttonRef = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  //the function allows to manage filter visibility after button click and chenge content button
  const open = (event) => {
    let actualButtonState = st;

    actualButtonState.forEach((el) => {
      if (el.group === event.target.value) {
        el.click = !el.click;
        el.click === true ? (el.classname = "list checkbox-select-group-on") : (el.classname = "list checkbox-select-group-off");
        el.click === true ? (buttonRef.current[event.target.value].className = "button-on") : (buttonRef.current[event.target.value].className = "button-off");
        el.click === true ? setIsOpen(true) : setIsOpen(false);
        checkbox.current[event.target.value].className = el.classname;
      }
    });
    setst(actualButtonState);
  };

  const handleCheckChildElement = (event) => {
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
    setresult(data);
  };

  //the function manage the select group selection. if select group is checked then
  //all the sub filter items must be checked. Otherwise, if select group is unchecked
  //then it restores the items to the previous state only if the previuos state isn't already "all selected".
  //(for example, you could have this situation when manually check all group items one by one. If you don't check this,
  //the function mantains all check subitems even if uncheck select group because it is the correct previous state).
  const handleAllChecked = (event) => {
    //it is a supporting array to save the actual checked values (useful to set filterres)
    let filterChoosen = [];
    let data = previous.data;
    if (event.target.checked) {
      //if the select group checkbox is clicked, it set all subitems to true.
      Object.entries(checkbox.current).map(([i, items]) => {
        if (i === event.target.value) {
          for (let j = 0; j < items.childNodes.length; j++) {
            items.childNodes[j].children[0].checked = true;
          }
        }
      });
      filterChoosen = checkbox.current; //todo: sistema in modo che al risultato arrivi il dato pronto! e gestisci questo ovunue
    } else if (!event.target.checked) {
      //take all the current checkboxes and let's see the group (i===event.target.value)
      //to restore data, you have to take the previous data: if the previous data was setted to
      //all checked subitems, then you have to set the checkboxes to false. Otherwise, if
      //there are data to restore, set the correct true/false value.
      Object.entries(checkbox.current).map(([i, items]) => {
        if (i === event.target.value) {
          data.map((prev) => {
            Object.entries(prev).map(([k, prevElem]) => {
              if (k === event.target.value) {
                //check if in the previous state all items was manually selected
                let areAllChecked = check(prevElem, true);
                if (areAllChecked === false) {
                  Object.entries(items.children).map(([indexLi, liElem]) => {
                    Object.entries(liElem.children).map(([indexInp, inputElem]) => {
                      return (inputElem.checked = prevElem[indexLi].isChecked);
                    });
                  });
                  filterChoosen = data;
                } else {
                  Object.entries(items.children).map(([indexLi, liElem]) => {
                    Object.entries(liElem.children).map(([indexInp, inputElem]) => {
                      return (inputElem.checked = false);
                    });
                  });

                  filterChoosen = [];
                }
              }
            });
          });
        }
      });
    }
  };

  //manage the situation in which you select all the subitems one by one or unselect one when are all selected.
  useEffect(() => {
    let data = previous.data;
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
  }, [handleCheckChildElement]);

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

                  <button value={group} onClick={open} className={"button-off"} ref={(el) => (buttonRef.current[group] = el)}>
                    {isOpen ? <>&#9660;</> : <>&#9650;</>}
                  </button>
                </div>
                <ul key={group} className={"list checkbox-select-group-off"} name={group} ref={(el) => (checkbox.current[group] = el)}>
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
