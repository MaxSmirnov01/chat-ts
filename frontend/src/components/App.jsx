import React, { useState, useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import routes from '../router/index';
import setDisign from '../theme';
import { ColorModeContext } from '../contexts';

const App = () => {
  const pages = useRoutes(routes);
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(() => createTheme(setDisign(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <Navbar />
          {pages}
          <ToastContainer />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
