/**
 * the function checked if an array contains some checked element
 * @param {array} ckbox
 * @returns {array}
 */
export function check(ckbox) {
  const result = ckbox.filter((el) => {
    return el.checked === true;
  });
  return result;
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
