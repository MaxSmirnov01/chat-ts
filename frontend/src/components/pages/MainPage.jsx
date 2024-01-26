import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Paper, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChannelsBox from '../channels/ChannelsBox.jsx';
import MessagesBox from '../messages/MessagesBox.jsx';
import getModal from '../../modals.js';
import getData from '../../api/getData.js';
import useLocalStorage from '../../hooks/useLocalStorage.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import useWindowWidth from '../../hooks/useWindowWidth';
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
  const windowWidth = useWindowWidth();
  const theme = useTheme();

  const { sm } = theme.breakpoints.values;

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
      component="main"
      elevation={16}
      sx={{
        height: '100vh',
        my: windowWidth > 700 ? '24px' : '15px',
        mx: windowWidth > 700 ? '50px' : 0,
        overflow: 'hidden',
      }}
    >
      <Grid container sx={{ height: '100%', flexWrap: 'nowrap' }}>
        {windowWidth > sm && (
          <>
            <Grid
              item
              sm={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <ChannelsBox />
            </Grid>
            <Divider orientation="vertical" />
          </>
        )}
        <Grid
          item
          sm={9}
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <MessagesBox />
        </Grid>
      </Grid>
      {modalIsOpen && <Modal />}
    </Paper>
  );
};

export default MainPage;
