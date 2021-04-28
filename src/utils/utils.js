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
 * the function changes the object checked
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
