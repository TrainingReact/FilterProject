/**
 * the function checked if an array contains all checked element
 * @param {array} ckbox
 * @returns {array}
 */
export function check(ckbox, condition) {
  return ckbox.every((element) => element.isChecked === condition);
}

/**
 * the function add isChecked field to every sub filter item
 * @param {array} arrayData
 * @returns {array}
 */
export function addIsCheckedToSubFilterData(arrayData) {
  const newData = arrayData.map((element) => {
    return {
      ...element,
      isChecked: false,
    };
  });
  return newData;
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
