import React, { useState, useMemo } from 'react';
import { AuthContext } from '../contexts';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthProvider = ({ children }) => {
  const user = JSON.parse(useLocalStorage('getItem'));
  const remove = useLocalStorage('removeItem');
  const [loggedIn, setLoggedIn] = useState(!!user);
  const [username, setUserName] = useState(user ? user.username : null);

  const authValue = useMemo(
    () => ({
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
    }),
    [loggedIn, remove, username],
  );

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
