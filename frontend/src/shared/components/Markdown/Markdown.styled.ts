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
`;
