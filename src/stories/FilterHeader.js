import { SELECT_ALL } from "../data/Data";
import "./filterheader.css";
export default function FilterHeader(props) {
  return (
    <div className="filter-header" style={{ backgroundColor: props.backgroundColor }}>
      <input type="checkbox" name="selectAll" />
      <label className={props.classname} style={{ fontWeight: props.mapping }}>
        {/* {SELECT_ALL.filterName} */}
        {props.label}
      </label>
    </div>
  );
}

/* FilterHeader.defaultProps = {
  classname: "primary",
  label: "primary",
  backgroundColor: "",
};
 */
