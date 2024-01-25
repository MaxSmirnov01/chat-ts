import React, { useEffect, useRef } from 'react';
import { Typography, List, Paper, ListItem, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import InputChat from './InputChat';
import useAuth from '../../hooks/useAuth';

const MessagesBox = () => {
  const chatRef = useRef(null);
  const { t } = useTranslation();
  const { username } = useAuth();
  const theme = useTheme();

  const messages = useSelector((state) => state.messages.messages);
  const channelId = useSelector((state) => state.channels.currentChannelId);

  const channelName = useSelector((state) => {
    const { channels } = state.channels;
    return channels.find((channel) => channel.id === channelId);
  });

  const messagesFilteredById = messages.filter((message) => message.channelId === channelId);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messagesFilteredById]);

  return (
    <>
      <Paper elevation={6} sx={{ padding: '13px 18px' }}>
        <Typography variant="h6">{channelName && `# ${channelName.name}`}</Typography>
        <Typography component="span">{t('Messages.count', { count: messagesFilteredById.length })}</Typography>
      </Paper>
      <Divider />
      <List component="ul" ref={chatRef} sx={{ overflow: 'auto', px: 5 }}>
        {messagesFilteredById.map((message) => (
          <ListItem
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.username === username ? 'flex-end' : 'flex-start',
              px: 0,
            }}
          >
            <Typography
              sx={{
                backgroundColor: message.username === username ? 'primary.main' : 'secondary.main',
                color: theme.palette.primary.contrastText,
                borderRadius: '10px',
                p: 2,
                wordWrap: 'break-word',
                wordBreak: 'break-word',
              }}
            >
              <b>{message.username}</b>
              {`: ${message.body}`}
            </Typography>
          </ListItem>
        ))}
      </List>
      <InputChat channelId={channelId} />
    </>
  );
};

export default MessagesBox;
