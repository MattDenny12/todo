import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #eeeeee;
    }

    .h1 .h2 .h3 .h4 .h5 .h6 h1 h2 h3 h4 h5 h6 {
        margin: 0px;
    }

    h1 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 900;
        font-size: 48px;
    };

    h2 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 28px;
    };

    h3 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 20px;
    };

    div span body {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 12px;
        font-color: #373d3f;
    }
`;

export default GlobalStyle;