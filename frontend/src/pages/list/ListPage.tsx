import CardList from "./CardList/CardList";
import FilterContainer from "./FilterContainer/FilterContainer";

function ListPage() {
  return (
    <>
      <FilterContainer />
      <CardList />
      <div style={{ height: "2000px", backgroundColor: "#fff" }} />
    </>
  );
}

export default ListPage;
