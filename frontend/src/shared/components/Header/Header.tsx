import { useLocation } from "react-router";
import { NAV_LIST } from "./constants/Header.constants";
import * as S from "./Header.styled";
import NavBar from "./NavBar/NavBar";
import RegisterProjectButton from "./RegisterProjectButton/RegisterProjectButton";
import SubMenu from "./SubMenu/SubMenu";

function Header() {
  const pathname = useLocation().pathname;
  const currentNav = NAV_LIST.find((item) => pathname.startsWith(item.href));
  return (
    <S.Header>
      <S.HeaderBox>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <S.Wrap>
            <S.LogoLink to="/">모아온</S.LogoLink>
            <NavBar items={NAV_LIST} />
          </S.Wrap>
          <S.Wrap>
            <RegisterProjectButton />
          </S.Wrap>
        </div>
        {currentNav?.subMenus && <SubMenu items={currentNav?.subMenus} />}
      </S.HeaderBox>
    </S.Header>
  );
}

export default Header;
