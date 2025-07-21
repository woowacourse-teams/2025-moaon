import Header from "@/shared/components/Header/Header";
import CardList from "./CardList/CardList";

function ListPage() {
  return (
    <div>
      <Header />
      <CardList />
      <div style={{ height: "2000px", backgroundColor: "#fff" }} />
    </div>
  );
}

export default ListPage;
