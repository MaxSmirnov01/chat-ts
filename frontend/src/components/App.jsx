import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import routes from '../router/index';

const App = () => {
  const pages = useRoutes(routes);

  return (
    <>
      <Navbar />
      {pages}
      <ToastContainer />
    </>
  );
};

export default App;
