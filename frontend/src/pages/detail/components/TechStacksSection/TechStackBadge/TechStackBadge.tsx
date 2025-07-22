import * as S from "./TechStackBadge.styled";

interface TechStackBadgeProps {
  text: string;
}

const techIconMap: Record<string, string> = {
  javascript: "https://icon.icepanel.io/Technology/svg/JavaScript.svg",
  typescript: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  react: "https://icon.icepanel.io/Technology/svg/React.svg",
  nextjs: "https://icon.icepanel.io/Technology/svg/NextJS.svg",
};

function TechStackBadge({ text }: TechStackBadgeProps) {
  const lowerText = text.toLowerCase();
  const iconSrc = techIconMap[lowerText];

  return (
    <S.TechStackBadge>
      <img src={iconSrc} alt="" width={24} />
      {text}
    </S.TechStackBadge>
  );
}

export default TechStackBadge;
