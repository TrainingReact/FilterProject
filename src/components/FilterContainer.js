import FilterBody from "./FilterBody";
import FilterHeader from "./FilterHeader";

/* export default function FilterContainer(props) {
  const { close: hide, isShowing: isShowing } = props;
  return isShowing ? (
    <div className="filter-body-container">
      <FilterHeader />
      <FilterBody />
    </div>
  ) : null;
} */

export default function FilterContainer() {
  return (
    <div className="filter-body-container">
      <FilterHeader />
      <FilterBody />
    </div>
  );
}
