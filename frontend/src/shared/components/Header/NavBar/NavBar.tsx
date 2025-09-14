import { useLocation, useNavigate } from "react-router";
import useArticleList from "@/pages/article/hooks/useArticleList";
import useProjectList from "@/pages/project-list/hooks/useProjectList";
import type { NavItem } from "../types/Header.types";
import * as S from "./NavBar.styled";

interface NavBarProps {
  items: NavItem[];
}

function NavBar({ items }: NavBarProps) {
  const pathname = useLocation().pathname;
  const selectedIndex = items.findIndex((item) => item.href === pathname);
  const navigate = useNavigate();
  const { refetch: projectListRefetch } = useProjectList();
  const { refetch: articleListRefetch } = useArticleList();

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
        {items.map(({ id, href, text }, idx) => (
          <S.NavLinkItem key={id}>
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
