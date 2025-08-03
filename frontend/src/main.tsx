import { Global } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import GAInitializer from "./libs/googleAnalytics/components/GAInitializer";
import { resetStyle } from "./styles/reset.styled";

const container = document.getElementById("root");
const root = createRoot(container!);
const queryClient = new QueryClient();
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Global styles={resetStyle} />
        <GAInitializer />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
