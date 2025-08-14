import { useLayoutEffect, useRef, useState } from "react";
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
  const linkRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [underlineStyle, setUnderlineStyle] = useState({
    translateX: 0,
    width: 0,
  });
  const activeIndex = NAV_LIST.findIndex((item) => item.href === pathname);
  const navigate = useNavigate();
  const { refetch: projectListRefetch } = useProjectList();
  const { refetch: articleListRefetch } = useArticleList();

  useLayoutEffect(() => {
    const activeRef = linkRefs.current[activeIndex];
    if (activeRef) {
      const { offsetLeft, clientWidth } = activeRef;
      setUnderlineStyle({ translateX: offsetLeft, width: clientWidth });
    }
  }, [activeIndex]);

  const hasActive = activeIndex > -1;

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
          <S.NavLinkItem
            key={id}
            ref={(el) => {
              linkRefs.current[idx] = el;

              return () => {
                linkRefs.current[idx] = null;
              };
            }}
          >
            <S.Link
              type="button"
              isSelected={activeIndex === idx}
              onClick={() => handleNavigation(href)}
            >
              {text}
            </S.Link>
          </S.NavLinkItem>
        ))}
        {hasActive && (
          <S.Underline
            translateX={underlineStyle.translateX}
            width={underlineStyle.width}
          />
        )}
      </S.NavLinkList>
    </S.NavBar>
  );
}

export default NavBar;
