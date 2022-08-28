import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import GlobalStyle from './global_style';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <Container>
        <GlobalStyle />
        <App />
    </Container>
);