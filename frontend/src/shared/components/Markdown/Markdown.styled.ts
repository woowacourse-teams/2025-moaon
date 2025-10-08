import styled from "@emotion/styled";

export const MarkdownWrapper = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr {
    margin: 0;
    margin-top: 1rem;
    font-size: revert;
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
