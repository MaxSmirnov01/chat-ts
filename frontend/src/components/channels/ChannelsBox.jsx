import React from 'react';
import { Typography, IconButton, Tooltip, List, Divider, Paper } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../../slices/channelsSlice';
import { showModal } from '../../slices/modalSlice';
import DefaultChannel from './DefaultChannel';
import NewChannel from './NewChannel';

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { t } = useTranslation();

  const handleSelectChannel = (id) => {
    dispatch(setCurrentChannel({ currentChannelId: id }));
  };

  const handleAddChannel = () => {
    dispatch(showModal({ type: 'add', channelId: null }));
  };

  const handleRemoveChannel = (id) => {
    dispatch(showModal({ type: 'remove', channelId: id }));
  };

  const handleRenameChannel = (id) => {
    dispatch(showModal({ type: 'rename', channelId: id }));
  };

  return (
    <>
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: '15px',
        }}
      >
        <Typography variant="h6">{t('Channels.channels')}</Typography>
        <Tooltip title="Добавить канал" arrow disableFocusListener disableTouchListener disableInteractive>
          <IconButton onClick={handleAddChannel} size="large" aria-label="add channel">
            <AddBoxOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Paper>
      <Divider />
      <List component="ul" sx={{ overflow: 'auto' }}>
        {channels.map((channel) => {
          if (channel.removable === false) {
            return (
              <DefaultChannel
                key={channel.id}
                channel={channel}
                currentChannelId={currentChannelId}
                handleSelectChannel={handleSelectChannel}
              />
            );
          }
          return (
            <NewChannel
              key={channel.id}
              channel={channel}
              currentChannelId={currentChannelId}
              handleSelectChannel={handleSelectChannel}
              handleRemoveChannel={handleRemoveChannel}
              handleRenameChannel={handleRenameChannel}
            />
          );
        })}
      </List>
    </>
  );
};

export default ChannelsBox;
