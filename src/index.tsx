import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";
import App from "./App";
import { GlobalStyle, theme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
