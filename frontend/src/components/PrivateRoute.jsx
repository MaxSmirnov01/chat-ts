import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import paths from '../router/paths';

const PrivateRoute = (props) => {
  const auth = useAuth();
  const { children } = props;
  if (auth.loggedIn) {
    return children;
  }
  return <Navigate to={paths.loginPath()} />;
};

export default PrivateRoute;
