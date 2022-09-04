import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #eeeeee;
    }

    .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
        margin: 0px;
        padding: 0px;
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

    div, span, body, button {
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 14px;
        color: #373d3f;
        border-width: 0px;
        border-radius: 5px;
        border-style: solid;
        outline-width: 0px;
        outline-style: solid;
    }

    div.container {
        padding: 0px;
    }

    *:focus {
        transition-duration: 0.1s;
        outline-style: solid;
        outline-width: 3px;
        outline-color: #5555ff;
    }
`;

export default GlobalStyle;