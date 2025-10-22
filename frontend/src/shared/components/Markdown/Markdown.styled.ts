import styled from "@emotion/styled";
import Polymorphic from "../Polymorphic/Polymorphic";

export const MarkdownWrapper = styled(Polymorphic)`
  blockquote {
    height: auto;
    min-height: 0;
    padding: 1rem 1rem 1rem 2rem;
    border-left: 4px solid #007bff;
    background-color: #f7f7f7ff;
    display: flex;
  }
`;
