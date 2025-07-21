import { Route, Routes } from "react-router";
import ListPage from "./pages/list/ListPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<a href="/list">리스트 페이지 이동</a>} />
      <Route path="/list" element={<ListPage />} />
    </Routes>
  );
}

export default App;
