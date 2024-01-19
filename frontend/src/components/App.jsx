import React, { useState, useMemo } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarComponent from './Navbar';
import AuthorizationForm from './AuthorizationForm';
import routes from '../routes';
import MainPage from './MainPage';
import NotFound from './NotFound';
import Signup from './Signup';
import { AuthContext } from '../contexts';
import useLocalStorage from '../hooks/useLocalStorage';
import useAuth from '../hooks/useAuth';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
};

const AuthProvider = ({ children }) => {
  const user = JSON.parse(useLocalStorage('getItem'));
  const remove = useLocalStorage('removeItem');
  const [loggedIn, setLoggedIn] = useState(!!user);
  const [username, setUserName] = useState(user ? user.username : null);

  const authValue = useMemo(() => ({
    loggedIn,
    logIn: (name) => {
      setLoggedIn(true);
      setUserName(name);
    },
    logOut: () => {
      remove();
      setLoggedIn(false);
      setUserName(null);
    },
    username,
  }), [loggedIn, remove, username]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = (props) => {
  const auth = useAuth();
  const { children } = props;
  if (auth.loggedIn) {
    return children;
  }
  return <Navigate to={routes.loginPath()} />;
};

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <div className="d-flex flex-column h-100">
        <AuthProvider>
          <Router>
            <NavbarComponent />
            <Routes>
              <Route
                path={routes.mainPath()}
                element={(
                  <PrivateRoute>
                    <MainPage />
                  </PrivateRoute>
                )}
              />
              <Route path={routes.loginPath()} element={<AuthorizationForm />} />
              <Route path={routes.notFoundPath()} element={<NotFound />} />
              <Route path={routes.signupPath()} element={<Signup />} />
            </Routes>
          </Router>
        </AuthProvider>
        <ToastContainer />
      </div>
    </ErrorBoundary>
  </Provider>
);

export default App;
