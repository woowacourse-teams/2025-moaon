import * as S from "./Post.styled";

interface PostProps {
  title: string;
  description: string;
  linkUrl: string;
  imageUrl: string;
}

function Post({ title, description, linkUrl, imageUrl }: PostProps) {
  return (
    <S.PostBox>
      <S.PostLink href={linkUrl} target="blank" rel="noopener noreferrer">
        <S.TextBox>
          <S.PostTitle>{title}</S.PostTitle>
          <S.PostContent>{description}</S.PostContent>
          <S.PostLinkBox>
            <img
              src="https://cdn.newsin.co.kr/news/photo/202406/120516_122106_3453.jpg"
              width={20}
              height={20}
              alt="링크 파비콘"
            />
            <S.PostLinkText>{linkUrl}</S.PostLinkText>
          </S.PostLinkBox>
        </S.TextBox>
        <img
          src={imageUrl}
          width={350}
          height={158}
          alt="포스트 썸네일"
          style={{
            borderLeft: "1px solid black",
            display: "block",
            objectFit: "cover",
          }}
        />
      </S.PostLink>
    </S.PostBox>
  );
}

export default Post;
