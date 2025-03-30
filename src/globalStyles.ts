import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%; 
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif; 
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  ul, ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    cursor: pointer;
  }

  *:focus {
    outline: none;
  }
`;