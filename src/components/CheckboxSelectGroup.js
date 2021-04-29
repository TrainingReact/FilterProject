import React, { useRef, useState, useContext, useEffect } from "react";
import ButtonGroup from "./ButtonGroup";
import { check, saveData, manageGroupCheckboxes, addIsCheckedToSubFilterObjectData, formattingResFromRef, takePreviousChecked } from "../utils/utils";
import { SubSelectallContext } from "../components/Filter";
import CheckboxSelectElement from "../components/CheckboxSelectElement";
import { allCheckboxManagement } from "../components/FilterContainer";

/**
 * Check group management
 * @param {function} props.setresult
 * @param {array} props.totalData
 * @param {array} props.classItemState
 * @param {function} props.setClassItemState
 * @returns
 */
export default function CheckboxSelectGroup(props) {
  const { setresult: setresult, totalData: totalData, classItemsState: classItemsState, setClassItemsState: setClassItemsState } = props;
  //SUB_SELECT_ALL data context
  const SubSelall = useContext(SubSelectallContext);
  //Is select all pressed?
  const selectAllItems = useContext(allCheckboxManagement);
  //it add ischecked property for every sub filter value to set the state with updated data
  const newTotalData = addIsCheckedToSubFilterObjectData(totalData);
  //the useState is used to restore the previous checkboxes configuration. At initial step, it is equal to current data
  const [previous, setPrevious] = useState({ data: newTotalData });
  //checkbox items select group ref
  const checkbox = useRef([]);
  //checkbox select group ref
  const selectGroup = useRef([]);
  /**
   * manage select all button both for checkbox item and select group
   */
  useEffect(() => {
    let data = previous.data;
    if (selectAllItems) {
      saveData(previous, checkbox, setPrevious);
      Object.entries(checkbox.current).map(([i, items]) => {
        Object.entries(items.children).map(([indexLi, liElem]) => {
          return Object.entries(liElem.children).map(([indexInp, inputElem]) => {
            inputElem.checked = true;
          });
        });
      });
      selectGroup.current.map((sel) => {
        sel.checked = true;
      });
      setresult(formattingResFromRef(checkbox.current));
    } else {
      Object.entries(checkbox.current).map(([i, items]) => {
        Object.entries(items.children).map(([indexLi, liElem]) => {
          return Object.entries(liElem.children).map(([indexInp, inputElem]) => {
            inputElem.checked = false;
          });
        });
      });
      manageGroupCheckboxes(data, selectGroup.current);
      setresult(formattingResFromRef(checkbox.current));
    }
  }, [selectAllItems]);

  //the function manage the select group selection. if select group is checked then
  //all the sub filter items must be checked. Otherwise, if select group is unchecked
  //then it restores the items to the previous state only if the previuos state isn't already "all selected".
  //(for example, you could have this situation when manually check all group items one by one. If you don't check this,
  //the function mantains all check subitems even if uncheck select group because it is the correct previous state).
  const handleAllChecked = (event) => {
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
    } else {
      //take all the current checkboxes and let's see the group (i===event.target.value)
      //to restore data, you have to take the previous data: if the previous data was setted to
      //all checked subitems, then you have to set the checkboxes to false. Otherwise, if
      //there are data to restore, set the correct true/false value.
      Object.entries(checkbox.current).map(([i, items]) => {
        Object.entries(items.children).map(([indexLi, liElem]) => {
          Object.entries(liElem.children).map(([indexInp, inputElem]) => {
            return (inputElem.checked = false);
          });
        });
        saveData(previous, checkbox, setPrevious);
      });
    }
    //send result to header filter
    setresult(formattingResFromRef(checkbox.current));
  };

  return (
    <div className="sub-filter-container">
      {newTotalData.map((element, index) => {
        {
          return Object.entries(element).map(([group, items]) => {
            return (
              <span key={group}>
                <div className="checkbox-select-group">
                  <div className="check-group-align">
                    {SubSelall.map((checkPresent, i) => {
                      if (checkPresent.filterGroup === group) {
                        return (
                          <input
                            key={i}
                            type="checkbox"
                            name="selectAll"
                            value={checkPresent.filterGroup}
                            ref={(el) => (selectGroup.current[i] = el)}
                            onChange={handleAllChecked}
                            id="input-sub-items"
                          />
                        );
                      }
                    })}
                  </div>
                  <label className="title-group-name">
                    <h4>{group}</h4>
                  </label>
                  <div className="button-group">
                    <ButtonGroup group={group} classItemsState={classItemsState} checkbox={checkbox.current} setClassItemsState={setClassItemsState} />
                  </div>
                </div>
                <ul key={group} className={"list checkbox-select-group-off"} name={group} ref={(el) => (checkbox.current[group] = el)}>
                  {items.map((item, i) => {
                    return (
                      <CheckboxSelectElement
                        key={i}
                        i={i}
                        selectGroup={selectGroup}
                        item={item}
                        group={group}
                        checkbox={checkbox}
                        setresult={setresult}
                        previous={previous}
                        setprevious={setPrevious}
                      />
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
