import FilterBody from "./FilterBody";
import FilterHeader from "./FilterHeader";
/**
 * The overall filter container component
 * @param {bool} props.isShowing
 * @returns
 */
export default function FilterContainer(props) {
  const { close: hide, isShowing: isShowing } = props;
  return isShowing ? (
    <div className="filter-body-container">
      <FilterHeader />
      <FilterBody />
    </div>
  ) : null;
}
