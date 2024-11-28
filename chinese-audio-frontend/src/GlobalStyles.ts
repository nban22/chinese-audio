import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --text-color: #333333;
    --black-background-color: #000000;
    --gray-background-color: #111111;
    --white-text-color: #ffffff;
  }

  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    color: var(--text-color);
    background-color: #f9f9f9;
  }
`;

export default GlobalStyles;
