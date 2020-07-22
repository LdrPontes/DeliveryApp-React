import React from 'react';

import Routes from './routes';
import GlobalStyle from './app/global/globalStyles';
import { StylesProvider } from '@material-ui/core/styles';

function App() {
    return (
        <>
            <StylesProvider injectFirst>
                <Routes />
                <GlobalStyle />
            </StylesProvider>
        </>
    );
}

export default App;
