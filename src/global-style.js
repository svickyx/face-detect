import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        padding: 0;
        font-size: 24px;
        background: linear-gradient(to right, rgb(183, 136, 200), rgb(133, 213, 212));
    }

    a {
        color: black;
    }

    button {
        border-style: none;
    }

    .particles {
        position: fixed;
        z-index: -1;
        top:0;
        left: 0;
        right:0;
        bottom:0;
    }
`;