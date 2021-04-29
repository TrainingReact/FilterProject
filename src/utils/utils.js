//THIS FILE CONTAINS ALL FUNCTION (NOT COMPONENT OR CUSTOM HOOK )

/**
 * the function checked if an array contains all checked element
 * @param {array} ckbox
 * @returns {array}
 */
export function check(ckbox, condition) {
  return ckbox.every((element) => element.isChecked === condition);
}

/**
 * the function returns actual filter selected
 * @param {array} next
 * @returns {array}
 */
export function whatIsCheckedByUser(next) {
  var trueValues = next.filter((el) => {
    return conditionFilter(el);
  });
  return trueValues;
}

/**
 * the function is the condition referred to the filter array js function in whatIsCheckedByUser
 * @param {object} el
 * @returns {object}
 */
export function conditionFilter(el) {
  return el.isChecked === true;
}

/**
 * the function add isChecked property to subgroup checkboxes
 * @param {array} arrayData
 * @returns array
 */
export function addIsCheckedToSubFilterObjectData(arrayData) {
  let newDataObj = [];
  Object.entries(arrayData).map(([key, value]) => {
    newDataObj.push({
      [key]: value.map((elem) => {
        return {
          ...elem,
          isChecked: false,
        };
      }),
    });
  });
  return newDataObj;
}

/**
 * search a value from a filterValue. It is used in CheckboxSelectElement component
 * in a find (array) to take the current checked value
 * @param {object} el
 * @param {string} value
 * @returns
 */
export function searchValue(el, value) {
  return el.filterValue === value;
}

/**
 * This function converts javascript checkbox data into a determine objects array. It is useful to allow
 * to FilterResult state (filterres, setFilterres) to read checked checkboxes
 * @param {array} checkbox
 * @returns {array}
 */
export function formattingResFromRef(checkbox) {
  let filterChoosen = [];
  Object.entries(checkbox).map(([i, items]) => {
    Object.entries(items.children).map(([indexLi, liElem]) => {
      return Object.entries(liElem.children).map(([indexInp, inputElem]) => {
        filterChoosen.push({
          filterValue: inputElem.value,
          isChecked: inputElem.checked,
        });
      });
    });
  });
  return filterChoosen;
}

/**
 * This function converts data (actual/previous data) into a determine objects array. It is useful to allow
 * to FilterResult state (filterres, setFilterres) to read checked checkboxes
 * @param {array} data
 * @returns {array}
 */
export function formattingResFromData(data) {
  let filterChoosen = [];
  data.map((elem) => {
    Object.entries(elem).map(([k, prevElem]) => {
      prevElem.map((e) => {
        filterChoosen.push({
          filterValue: e.filterValue,
          isChecked: e.isChecked,
        });
      });
    });
  });

  return filterChoosen;
}

/**
 * the function saves the previous state
 * @param {array} previous
 * @param {array} checkbox
 * @param {function} setprevious
 */
export function saveData(previous, checkbox, setprevious) {
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
}

/**
 * The function returns a previous state array.
 * @param {array} data
 * @returns {array}
 */
export function takePreviousChecked(data) {
  let takePreviousChecked = [];
  data.map((elem) => {
    return Object.entries(elem).map(([group, items]) => {
      items.map((el) => {
        takePreviousChecked.push({
          filterValue: el.filterValue,
          isChecked: el.isChecked,
        });
      });
    });
  });
  return takePreviousChecked;
}

/**
 * this function checks if you manually selected single items until you select all items.
 * It is useful to understand if the system must automatically checked select group button.
 * Also, the function manages if you deselected a single item after checked all group
 * @param {array} data
 * @param {array} selectGroup
 */
export function manageGroupCheckboxes(data, selectGroup) {
  data.map((elem) => {
    return Object.entries(elem).map(([group, items]) => {
      let isAllChecked = check(items, true);
      if (isAllChecked) {
        selectGroup.map((sel) => {
          if (sel.value === group) {
            sel.checked = true;
          }
        });
      } else if (!isAllChecked) {
        selectGroup.map((sel) => {
          if (sel.value === group) {
            sel.checked = false;
          }
        });
      }
    });
  });
}
