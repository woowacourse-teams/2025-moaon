import { useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
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
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const activeIndex = NAV_LIST.findIndex((item) => item.href === pathname);

  useLayoutEffect(() => {
    const activeRef = linkRefs.current[activeIndex];
    if (activeRef) {
      const { offsetLeft, clientWidth } = activeRef;
      setUnderlineStyle({ left: offsetLeft, width: clientWidth });
    }
  }, [activeIndex]);

  const hasActive = activeIndex > -1;
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
            <S.Link to={href} reloadDocument>
              {text}
            </S.Link>
          </S.NavLinkItem>
        ))}
        {hasActive && (
          <S.Underline
            left={underlineStyle.left}
            width={underlineStyle.width}
          />
        )}
      </S.NavLinkList>
    </S.NavBar>
  );
}

export default NavBar;
