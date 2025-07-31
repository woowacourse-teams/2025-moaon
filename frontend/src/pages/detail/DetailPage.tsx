import { useParams } from "react-router";
import Carousel from "./components/Carousel/Carousel";
import useProjectDetail from "./components/hooks/useProjectDetail";
import OverviewSection from "./components/OverviewSection/OverviewSection";
// import PlatformSection from "./components/PlatformSection/PlatformSection";
import Post from "./components/Post/Post";
import SectionTitle from "./components/SectionTitle";
import TechStacksSection from "./components/TechStacksSection/TechStacksSection";
import TitleSection from "./components/TitleSection/TitleSection";

const MOCK_DATA = [
  {
    title: "webpack config 설정",
    description:
      "Webpack을 설치하고 설정을 진행하는 과정에서 발생한 이슈입니다.",
    linkUrl:
      "https://tattered-drive-af3.notion.site/webpack-config-2314b5223064807989adcf30c9e59e89?source=copy_link",
    imageUrl:
      "https://img.notionusercontent.com/s3/prod-files-secure%2Ff014b522-3064-8164-8ad7-0003535f9189%2F73ce6692-6418-4d2d-a853-5ef5b3b282bc%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2025-07-15_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.04.07.png/size/w=2000?exp=1753790515&sig=DE9nVQnPpLnB8v5KpoC231FSy9ZQ5mfOlA2X6JvZDuU&id=2314b522-3064-805d-9c0f-eaad0657fac4&table=block&userId=eebfc449-ed78-4c16-bdd6-73cf5486c12e",
  },
  {
    title: "EC2 도커 갑자기 안됨",
    description:
      "EC2 접근이 안돼서 들어가보니까 컨테이너가 실행이 안되고 있음.",
    linkUrl:
      "https://tattered-drive-af3.notion.site/EC2-2334b522306480d08df9fdf46ac4820b?source=copy_link",
    imageUrl: "https://fs.buttercms.com/resize=width:885/G6MTluCDSFGZcZLMSaTJ",
  },
  {
    title: "EC2 디스크 용량 부족",
    description: "EC2 인스턴스의 여유 디스크 공간이 400M도 채 안됨.",
    linkUrl:
      "https://tattered-drive-af3.notion.site/EC2-2354b5223064806b98b5c6e9d41f22f5?source=copy_link",
    imageUrl:
      "https://img.notionusercontent.com/s3/prod-files-secure%2Ff014b522-3064-8164-8ad7-0003535f9189%2F8488d3db-7b0c-4b41-a75c-a03cfd8a20d7%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2025-07-19_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.36.13.png/size/w=2000?exp=1753790488&sig=hv7ZO3-z7TpGh2tbHgXpxtNaEvHShtcZ719wgof73Hc&id=2354b522-3064-803b-a37f-f6578d302522&table=block&userId=eebfc449-ed78-4c16-bdd6-73cf5486c12e",
  },
  {
    title: "/detail/:id 경로 접근 시 오류",
    description:
      "React Router에서 /detail/:id 경로에 직접 접근 시 Webpack Dev Server가 페이지를 정상 로딩하지 못하는 문제.",
    linkUrl:
      "https://tattered-drive-af3.notion.site/detail-id-23a4b522306480e6a2c4fb35d0440de3?source=copy_link",
    imageUrl:
      "https://img.notionusercontent.com/s3/prod-files-secure%2Ff014b522-3064-8164-8ad7-0003535f9189%2Fd9c368a8-c2c7-4559-bb91-bb4ebc75d77f%2Fimage.png/size/w=2000?exp=1753790200&sig=yk7RGTwkNHTSG7KrScFnAedo5Vio8s__Nz_CuU-hYS0&id=23a4b522-3064-80cd-b1aa-f6cafd5bb5ca&table=block&userId=eebfc449-ed78-4c16-bdd6-73cf5486c12e",
  },
];

function DetailPage() {
  const { id } = useParams();

  const { projectDetail, isLoading, error } = useProjectDetail(Number(id));

  if (isLoading || !projectDetail) return <div>로딩 중...</div>;
  if (error) return <div>비상!</div>;

  return (
    <div>
      <TitleSection projectDetail={projectDetail} />
      <Carousel imageUrls={projectDetail.imageUrls} />
      <OverviewSection overview={projectDetail.description} />
      <TechStacksSection techStacks={projectDetail.techStacks} />
      {/* <PlatformSection platforms={projectDetail.platforms} /> */}
      <SectionTitle title="기술 문서" />

      {MOCK_DATA.map(({ title, description, linkUrl, imageUrl }) => (
        <Post
          key={title}
          title={title}
          description={description}
          linkUrl={linkUrl}
          imageUrl={imageUrl}
        />
      ))}
    </div>
  );
}

export default DetailPage;
