import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import routes from '../router/index';

const App = () => {
  const pages = useRoutes(routes);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      {pages}
      <ToastContainer />
    </Box>
  );
};

export default App;
