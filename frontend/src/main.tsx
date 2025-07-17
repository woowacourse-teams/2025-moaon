import { Global } from "@emotion/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { resetStyle } from "./styles/reset.styled";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Global styles={resetStyle} />
      <App />
    </BrowserRouter>
  </StrictMode>,
);
