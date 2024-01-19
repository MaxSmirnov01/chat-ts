import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import getModal from '../modals.js';
import getData from '../api/getData.js';
import useLocalStorage from '../hooks/useLocalStorage.jsx';
import useAuth from '../hooks/useAuth.jsx';
import socket from '../socket.js';
import {
  addChannel, removeChannel, renameChannel, setCurrentChannel, defaultChannel,
} from '../slices/channelsSlice.js';
import { addMessage } from '../slices/messagesSlice.js';

const MainPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { token } = JSON.parse(useLocalStorage('getItem'));
  const { username, logOut } = useAuth();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { type, modalIsOpen } = useSelector((state) => state.modal);
  const Modal = getModal(type);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
      if (username === payload.username) {
        dispatch(setCurrentChannel({ currentChannelId: payload.id }));
      }
    });
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
      if (currentChannelId === payload.id) {
        dispatch(setCurrentChannel({ currentChannelId: defaultChannel }));
      }
    });
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
    });

    return () => {
      socket.off('connect');
      socket.off('newChannel');
      socket.off('newMessage');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch, username, currentChannelId]);

  useEffect(() => {
    try {
      dispatch(getData(token));
    } catch (error) {
      if (error.response.status === 401) {
        logOut();
        return;
      }
      toast.error(`${t('PopUpAlerts.mainPage')}`, {
        icon: '😿',
      });
    }
  }, [dispatch, t, token, logOut]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
      {modalIsOpen && <Modal />}
    </div>
  );
};

export default MainPage;
