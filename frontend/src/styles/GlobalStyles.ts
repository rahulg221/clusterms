import { createGlobalStyle } from 'styled-components';
import { lightTheme, darkTheme } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: typeof lightTheme | typeof darkTheme }>`
  html, body, #root {
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.bgDark};
    margin: 0;
    padding: 0;
  }

  body {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: 'Nunito', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;
