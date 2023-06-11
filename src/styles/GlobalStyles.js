import { createGlobalStyle } from "styled-components";

import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
${reset}

a {
    text-decoration: none;
    color: black;

    &.active {
      color: #3366ff;
      font-weight: 700;
    }
  }

h2 {
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 30px;
  }

`;

export default GlobalStyles;
