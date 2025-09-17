import { useTabAnimation } from "@shared/hooks/useTabAnimation";
import { useLocation, useNavigate } from "react-router";
import useArticleList from "@/pages/article/hooks/useArticleList";
import useProjectList from "@/pages/project-list/hooks/useProjectList";
import * as S from "./NavBar.styled";

const NAV_LIST = [
  {
    id: 1,
    href: "/project",
    text: "프로젝트 탐색",
  },
  {
    id: 2,
    href: "/article",
    text: "아티클 탐색",
  },
];

function NavBar() {
  const pathname = useLocation().pathname;
  const selectedIndex = NAV_LIST.findIndex((item) => item.href === pathname);
  const { setTabElementsRef, selectedStyle } = useTabAnimation({
    selectedIndex,
    duration: 0.3,
  });
  const navigate = useNavigate();
  const { refetch: projectListRefetch } = useProjectList();
  const { refetch: articleListRefetch } = useArticleList();
  const hasActive = selectedIndex > -1;

  const handleNavigation = (href: string) => {
    navigate(href);

    switch (href) {
      case "/article":
        articleListRefetch();
        break;
      case "/project":
        projectListRefetch();
        break;
    }
  };

  return (
    <S.NavBar>
      <S.NavLinkList>
        {NAV_LIST.map(({ id, href, text }, idx) => (
          <S.NavLinkItem key={id} ref={(el) => setTabElementsRef(el, idx)}>
            <S.Link
              type="button"
              isSelected={selectedIndex === idx}
              onClick={() => handleNavigation(href)}
            >
              {text}
            </S.Link>
          </S.NavLinkItem>
        ))}
      </S.NavLinkList>
    </S.NavBar>
  );
}

export default NavBar;
