import { createContext } from 'react';

export const AuthContext = createContext({});

export const SocketContext = createContext();

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
