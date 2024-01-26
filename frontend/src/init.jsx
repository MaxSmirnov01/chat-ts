import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import AuthProvider from './components/AuthProvider.jsx';
import ThemeColorProvider from './components/ThemeColorProvider.jsx';
import store from './slices/store.js';
import App from './components/App';
import resources from './locales/index.js';
import { SocketContext } from './contexts/index.jsx';
import socket from './socket.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  const api = {
    sendMessage: (...arg) => socket.emit('newMessage', ...arg),
    addChannel: (...arg) => socket.emit('newChannel', ...arg),
    removeChannel: (...arg) => socket.emit('removeChannel', ...arg),
    renameChannel: (...arg) => socket.emit('renameChannel', ...arg),
  };

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SocketContext.Provider value={api}>
          <BrowserRouter>
            <AuthProvider>
              <ThemeColorProvider>
                <App />
              </ThemeColorProvider>
            </AuthProvider>
          </BrowserRouter>
        </SocketContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
