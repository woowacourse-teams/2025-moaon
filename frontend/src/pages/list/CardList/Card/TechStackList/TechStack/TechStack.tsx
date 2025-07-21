import * as S from './TechStack.styled';

interface TechStackProps {
  imgUrl: string;
}

function TechStack({ imgUrl }: TechStackProps) {
  return (
    <S.TechStack>
      <S.TechStackIcon src={imgUrl} alt='' />
    </S.TechStack>
  );
}

export default TechStack;
