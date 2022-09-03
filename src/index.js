// Frameworks and stuff
import React from 'react';
import ReactDOM from 'react-dom/client';

// Components
import App from './app';
import GlobalStyle from './global_style';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <div>
        <GlobalStyle />
        <App />
    </div>
);