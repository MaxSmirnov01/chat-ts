import React, { useEffect, useRef, useState } from 'react';
import { Typography, List, Paper, ListItemText, Box, TextField, IconButton, Divider } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import EmojiPicker from 'emoji-picker-react';
import useSocket from '../hooks/useSocket';
import useAuth from '../hooks/useAuth';

const Messages = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmojis, setSelectedEmojis] = useState([]);

  const input = useRef(null);
  const emojiContainerRef = useRef(null);
  const emojiPickerContainerRef = useRef(null);
  const chatRef = useRef(null);
  const api = useSocket();
  const { t } = useTranslation();
  const { username } = useAuth();

  const messages = useSelector((state) => state.messages.messages);
  const channelId = useSelector((state) => state.channels.currentChannelId);

  const channelName = useSelector((state) => {
    const { channels } = state.channels;
    return channels.find((channel) => channel.id === channelId);
  });

  const messagesFilteredById = messages.filter((message) => message.channelId === channelId);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async ({ body }) => {
      formik.setSubmitting(true);

      try {
        await api.sendMessage({ body, channelId, username });
        formik.resetForm();
        setSelectedEmojis([]);
      } catch (error) {
        formik.setSubmitting(false);
        console.log(error);
      }
    },
  });

  const handleEmojiClick = ({ emoji }) => {
    if (Array.isArray(selectedEmojis)) {
      setSelectedEmojis(selectedEmojis.push(emoji));
      const newBody = selectedEmojis.join('');
      formik.setFieldValue('body', `${formik.values.body}${newBody}`);
    } else {
      formik.setFieldValue('body', `${formik.values.body}${emoji}`);
    }
  };

  const handleClickOutside = (e) => {
    if (
      emojiContainerRef.current &&
      !emojiContainerRef.current.contains(e.target) &&
      !emojiPickerContainerRef.current?.contains(e.target)
    ) {
      setShowEmojiPicker(false);
      input.current.focus();
    }
  };

  useEffect(() => input.current.focus(), [channelId, formik.isSubmitting, showEmojiPicker]);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messagesFilteredById]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Paper elevation={6} sx={{ padding: '13px 18px' }}>
        <Typography variant="h6">{channelName && `# ${channelName.name}`}</Typography>
        <Typography component="span">{t('Messages.count', { count: messagesFilteredById.length })}</Typography>
      </Paper>
      <Divider />
      <List component="ul" ref={chatRef} sx={{ overflow: 'auto', px: 5 }}>
        {messagesFilteredById.map((message) => (
          <ListItemText key={message.id}>
            <Typography>
              <b>{message.username}</b>
              {`: ${message.body}`}
            </Typography>
          </ListItemText>
        ))}
      </List>
      <Box sx={{ marginTop: 'auto', px: 5, py: 2 }}>
        {showEmojiPicker && (
          <Box ref={emojiPickerContainerRef} sx={{ width: '350px', height: '450px' }}>
            <EmojiPicker autoFocusSearch={false} onEmojiClick={handleEmojiClick} />
          </Box>
        )}
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            name="body"
            aria-label="Новое сообщение"
            placeholder={t('Messages.enterMessage')}
            inputRef={input}
            onChange={formik.handleChange}
            value={formik.values.body}
            fullWidth
            size="small"
            InputProps={{
              sx: { padding: 0 },
              startAdornment: (
                <IconButton type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} ref={emojiContainerRef}>
                  <SentimentSatisfiedRoundedIcon />
                </IconButton>
              ),
              endAdornment: (
                <IconButton type="submit" disabled={!formik.values.body.trim()}>
                  <SendRoundedIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Messages;
