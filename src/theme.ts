import { createGlobalStyle, DefaultTheme } from "styled-components";

export const GlobalStyle = createGlobalStyle`

body {
  height: 100vh;
  width: 100vw;
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background: linear-gradient(to bottom right, ${(props) =>
    props.theme.bgColor}, #292D3D);
  background-attachment: fixed;
  color:black;
  line-height: 1.2;
  font-size: 14px;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

export const theme: DefaultTheme = {
  bgColor: "#3f8cf2",
  boardColor: "#EBECF0",
  cardColor: "white",
};
