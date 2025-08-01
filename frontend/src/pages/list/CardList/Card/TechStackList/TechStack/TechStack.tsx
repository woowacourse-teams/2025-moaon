import * as S from "./TechStack.styled";

interface TechStackProps {
  techStackName: string;
  imgUrl: string;
}

function TechStack({ imgUrl, techStackName }: TechStackProps) {
  return (
    <S.TechStack>
      <S.TechStackIcon src={imgUrl} alt={techStackName} />
    </S.TechStack>
  );
}

export default TechStack;
