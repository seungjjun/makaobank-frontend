import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    word-break: keep-all;
    margin: 0;
    padding: 0;
    font-size: 16px;
    list-style: none;
  }

  body {
    background: ${[(props) => props.theme.colors.background]};
    color: ${[(props) => props.theme.colors.text]};
  }

  a {
    color: ${[(props) => props.theme.colors.text]};
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
