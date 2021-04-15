import { SELECT_ALL } from "../data/Data";

export default function FilterHeader() {
  return (
    <div className="filter-header">
      <input type="checkbox" name="selectAll" />
      <label>{SELECT_ALL.filterName}</label>
    </div>
  );
}
