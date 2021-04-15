import { SELECT_ALL } from "../data/Data";
import "./filterheader.css";

export default function FilterHeader() {
  return (
    <div className="filter-header">
      <input type="checkbox" name="selectAll" />
      <label>{SELECT_ALL.filterName}</label>
    </div>
  );
}

FilterHeader.defaultProps = {
  primary: true,
  backgroundColor: null,
  label: "primary",
};
