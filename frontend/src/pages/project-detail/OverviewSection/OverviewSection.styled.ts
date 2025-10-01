import styled from "@emotion/styled";

export const OverviewSectionContainer = styled.section`
  padding: 2rem 0 3rem;
  border-top: 1px solid #d4d4d4;
`;

export const OverviewContent = styled.div`
  font-size: 1rem;
  font-weight: 500;
  white-space: pre-wrap;
  line-height: 1.6;
  word-break: keep-all;
  overflow-wrap: break-word;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr {
    margin: 0;
    margin-top: 1rem;
  }

  blockquote {
    height: auto;
    min-height: 0;
    padding: 1rem 1rem 1rem 2rem;
    border-left: 4px solid #007bff;
    background-color: #f7f7f7ff;
    display: flex;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  li {
    list-style: inside;
  }

  hr {
    border: 1px solid #ebebebff;
  }
`;
