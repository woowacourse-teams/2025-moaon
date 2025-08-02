import * as S from "./NavBar.styled";

const NAV_LIST = [
  {
    id: 1,
    href: "/list",
    text: "프로젝트 탐색",
  },
  {
    id: 2,
    href: "/list", // 아티클 페이지가 없어 임시 링크 사용
    text: "아티클",
  },
];

function NavBar() {
  return (
    <S.NavBar>
      <S.NavLinkList>
        {NAV_LIST.map(({ id, href, text }) => (
          <S.NavLink key={id}>
            <S.Link to={href} reloadDocument>
              {text}
            </S.Link>
          </S.NavLink>
        ))}
      </S.NavLinkList>
    </S.NavBar>
  );
}

export default NavBar;
