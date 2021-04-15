import { SELECT_ALL } from "../data/Data";
/**
 * This component is referred to select all checkbox
 * If you want to remove select all option, remove FilterHeader from Filter.js
 * @returns
 */
export default function FilterHeader() {
  return (
    <div className="filter-header">
      <input type="checkbox" name="selectAll" />
      <label> {SELECT_ALL.filterName} </label>
    </div>
  );
}
