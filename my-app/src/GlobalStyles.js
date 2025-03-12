import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    background-color: #f8f8f8;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3 {
    font-family: 'Montserrat', sans-serif;
  }
`;

export default GlobalStyles;
