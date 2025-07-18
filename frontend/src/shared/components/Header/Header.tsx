import Logo from "@assets/icons/logo.svg";
import * as S from "./Header.styled";
import NavBar from "./NavBar/NavBar";
import RegisterProjectButton from "./RegisterProjectButton/RegisterProjectButton";
import SearchBar from "./SearchBar/SearchBar";

function Header() {
  return (
    <S.Header>
      <S.HeaderBox>
        <S.Flex>
          <img src={Logo} alt="123" />
          <NavBar />
        </S.Flex>
        <S.Flex>
          <SearchBar />
          <RegisterProjectButton />
        </S.Flex>
      </S.HeaderBox>
    </S.Header>
  );
}

export default Header;
