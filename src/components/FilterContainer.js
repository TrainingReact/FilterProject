import FilterBody from "./FilterBody";
import FilterHeader from "./FilterHeader";

export default function FilterContainer() {
  return (
    <div className="filter-body-container">
      <FilterHeader />
      <FilterBody />
    </div>
  );
}
