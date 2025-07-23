import CardList from "./CardList/CardList";
import Filter from "./Filter/Filter";

function ListPage() {
  return (
    <>
      <Filter />
      <CardList />
      <div style={{ height: "2000px", backgroundColor: "#fff" }} />
    </>
  );
}

export default ListPage;
