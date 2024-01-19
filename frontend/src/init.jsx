/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import leoProfanity from 'leo-profanity';
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

  const filter = leoProfanity;
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));

  const api = {
    sendMessage: (...arg) =>
      socket.emit('newMessage', ...arg, (response) => {
        console.log(response.status, 'message added');
      }),
    addChannel: (...arg) =>
      socket.emit('newChannel', ...arg, (response) => {
        const { status } = response;
        console.log(status, 'channel added');
      }),

    removeChannel: (...arg) =>
      socket.emit('removeChannel', ...arg, (response) => {
        console.log(response.status, 'channel removed');
      }),

    renameChannel: (...arg) =>
      socket.emit('renameChannel', ...arg, (response) => {
        console.log(response.status, 'channel renamed');
      }),
  };

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SocketContext.Provider value={api}>
          <App />
        </SocketContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
