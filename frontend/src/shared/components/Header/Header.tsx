import Logo from "@assets/icons/logo.svg";
import { Link } from "react-router";
import * as S from "./Header.styled";
import NavBar from "./NavBar/NavBar";
import RegisterProjectButton from "./RegisterProjectButton/RegisterProjectButton";

function Header() {
  return (
    <S.Header>
      <S.HeaderBox>
        <S.Wrap>
          <Link to="/">
            <img src={Logo} alt="로고" />
          </Link>
          <NavBar />
        </S.Wrap>
        <S.Wrap>
          <RegisterProjectButton />
        </S.Wrap>
      </S.HeaderBox>
    </S.Header>
  );
}

export default Header;
