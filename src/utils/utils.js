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
