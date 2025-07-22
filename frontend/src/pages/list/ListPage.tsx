import Header from "@/shared/components/Header/Header";
import CardList from "./CardList/CardList";
import Filter from "./Filter/Filter";

function ListPage() {
  return (
    <div>
      <Header />
      <Filter />
      <CardList />
      <div style={{ height: "2000px", backgroundColor: "#fff" }} />
    </div>
  );
}

export default ListPage;
