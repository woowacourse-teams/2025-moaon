import Logo from "@assets/icons/logo.svg";
import SearchBar from "../SearchBar/SearchBar";
import * as S from "./Header.styled";
import NavBar from "./NavBar/NavBar";
import RegisterProjectButton from "./RegisterProjectButton/RegisterProjectButton";

function Header() {
  return (
    <S.Header>
      <S.HeaderBox>
        <S.Wrap>
          <img src={Logo} alt="123" />
          <NavBar />
        </S.Wrap>
        <S.Wrap>
          <SearchBar
            width="fixed"
            shape="rounded"
            icon={{ size: 16, position: "left" }}
          />
          <RegisterProjectButton />
        </S.Wrap>
      </S.HeaderBox>
    </S.Header>
  );
}

export default Header;
