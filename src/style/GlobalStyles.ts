import styled, { createGlobalStyle } from 'styled-components';

export const TEXT_SHADOW = '2px 1px 1px rgba(0, 0, 0, 0.5)';

export const COLORS = {
    white: '#FFFFFF',
    lightestGray: '#FBFBFB',
    lightGray: '#F2F2F2',
    gray: '#CACACA',
    darkGray: '#7E7E7E',
    black: '#000000',
    green: '#008000',
    red: '#EB0000',
};

export const StyledUl = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

// type Props = {};

const GlobalStyles = createGlobalStyle`
   body, :root, html {
        margin: 0;
        width: 100%;
        min-height: 100vh;
        font-family: 'Archivo', sans-serif;
        font-size: 1rem;
        background-color: ${COLORS.white};
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .wrapper {
    padding: '8px';
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    display: grid;
    overflow-x: hidden;
  }
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  body {
    
  }
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

body::-webkit-scrollbar {
    display: none;
}

.wrapper::-webkit-scrollbar {
    display: none;
}

::-webkit-scrollbar {
    display: none;
}
`;

export default GlobalStyles;

type ColorsType = typeof COLORS;

declare module 'styled-components' {
    export type DefaultTheme = ColorsType;
}
