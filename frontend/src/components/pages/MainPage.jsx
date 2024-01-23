import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Paper, Divider } from '@mui/material';
import Channels from '../Channels.jsx';
import Messages from '../Messages.jsx';
import getModal from '../../modals.js';
import getData from '../../api/getData.js';
import useLocalStorage from '../../hooks/useLocalStorage.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import socket from '../../socket.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
  setCurrentChannel,
  defaultChannel,
} from '../../slices/channelsSlice.js';
import { addMessage } from '../../slices/messagesSlice.js';

const MainPage = () => {
  const dispatch = useDispatch();
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
    dispatch(getData({ token, logOut }));
  }, [dispatch, token, logOut]);

  return (
    <Paper
      elevation={16}
      sx={{
        height: '100vh',
        margin: '24px 34px',
        overflow: 'hidden',
      }}
    >
      <Grid container sx={{ height: '100%', flexWrap: 'nowrap' }}>
        <Grid
          item
          xs={2}
          sm={3}
          md={2}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Channels />
        </Grid>
        <Divider orientation="vertical" />
        <Grid
          item
          xs={10}
          sm={9}
          md={10}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Messages />
        </Grid>
      </Grid>
      {modalIsOpen && <Modal />}
    </Paper>
  );
};

export default MainPage;
