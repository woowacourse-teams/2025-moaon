import Logo from "@assets/icons/logo.svg";
import { Link } from "react-router";
import SearchBar from "../SearchBar/SearchBar";
import * as S from "./Header.styled";
import NavBar from "./NavBar/NavBar";
import RegisterProjectButton from "./RegisterProjectButton/RegisterProjectButton";

function Header() {
  return (
    <S.Header>
      <S.HeaderBox>
        <S.Wrap>
          <Link to="/list">
            <img src={Logo} alt="로고" />
          </Link>
          <NavBar />
        </S.Wrap>
        <S.Wrap>
          <SearchBar
            width="fixed"
            shape="rounded"
            icon={{ size: 16, position: "left" }}
            placeholder="프로젝트를 검색해 보세요"
          />
          <RegisterProjectButton />
        </S.Wrap>
      </S.HeaderBox>
    </S.Header>
  );
}

export default Header;
