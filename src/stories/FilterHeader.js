import { SELECT_ALL } from "../data/Data";
import "./filterheader.css";
export default function FilterHeader({ label, classname, backgroundColor }) {
  return (
    <div className="filter-header" style={{ backgroundColor: backgroundColor }}>
      <input type="checkbox" name="selectAll" />
      <label className={classname}>
        {/* {SELECT_ALL.filterName} */}
        {label}
      </label>
    </div>
  );
}

FilterHeader.defaultProps = {
  classname: "primary",
  label: "primary",
  backgroundColor: "#E6E6FA",
};
