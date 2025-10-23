import styled from "@emotion/styled";
import Polymorphic from "../Polymorphic/Polymorphic";

export const MarkdownWrapper = styled(Polymorphic)`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr {
    margin: 0 !important;
    margin-top: 1rem !important;
    font-size: revert !important;
  }

  ul {
    display: flex !important;
    flex-direction: column !important;
    gap: 1rem !important;
    height: auto !important;
    margin-top: 0.75rem !important;
    padding-left: 1.25rem !important;
  }

  ol {
    display: flex !important;
    flex-direction: column !important;
    gap: 0.5rem !important;
    height: auto !important;
    margin-top: 0.75rem !important;
    padding-left: 1.25rem !important;
    margin-bottom: 0 !important;
  }

  ol > li {
    list-style: decimal !important;
    line-height: 1.1 !important;
  }

  ul > li {
    list-style: disc !important;
    line-height: 1.1 !important;
  }

  ol > li > ul {
    margin: 0 !important;
  }

  ul > li > ul {
    margin: 0 !important;
  }

  li > p {
    margin: 0 !important;
  }

  p {
    line-height: 1.7 !important;
    margin-bottom: 0 !important;
  }

  ul > li > p {
    transform: translateY(-22.5px);
    line-height: 1.7 !important;
  }

  ol > li > p {
    transform: translateY(-22.5px);
    line-height: 1.7 !important;
  }

  br {
    height: 16px !important ;
  }

  hr {
    border: 1px solid #ebebebff !important;
    box-sizing: content-box;
    overflow: hidden;
    background: transparent;
    border: 0;
    height: 0;
    padding: 0;
    margin: 0 !important;
  }

  table {
    border-collapse: collapse !important;
    width: 100% !important;
    border: 1px solid #ddd !important;
  }

  thead {
    background-color: #f5f5f5 !important;
  }

  th {
    border: 1px solid #ddd !important;
    padding: 8px !important;
    text-align: left !important;
    font-weight: bold !important;
  }

  td {
    border: 1px solid #ddd !important;
    padding: 8px !important;
  }

  tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }

  strong {
    font-weight: 600;
  }

  blockquote {
    height: auto;
    min-height: 0;
    padding: 1rem 1rem 1rem 2rem;
    border-left: 4px solid #007bff;
    background-color: #f7f7f7ff;
    display: flex;
  }

  .wmde-markdown::before {
    content: unset !important;
  }
`;
