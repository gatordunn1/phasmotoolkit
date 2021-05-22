import React from 'react';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import { Evidence } from './features/evidence/Evidence';
import { Ghosts } from './features/ghosts/Ghosts';
import Header from './features/header/Header';

import './App.css';

function App() {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // prefersDarkMode ? 'dark' : 'light'
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
        },
        typography: {
          fontFamily: [
            'Indie Flower'
          ].join(','),
        }
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='App'>
        <header className='App-header'>
          <Header />
        </header>
        <main className="App-main">
        <Evidence />
          <Divider light />
          <Ghosts />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
