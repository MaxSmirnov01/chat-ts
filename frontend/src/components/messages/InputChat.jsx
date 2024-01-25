import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import EmojiPicker from 'emoji-picker-react';
import { useTranslation } from 'react-i18next';
import useSocket from '../../hooks/useSocket';
import useAuth from '../../hooks/useAuth';

const InputChat = ({ channelId }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const api = useSocket();
  const { username } = useAuth();
  const { t } = useTranslation();
  const theme = useTheme();

  const input = useRef(null);
  const emojiContainerRef = useRef(null);
  const emojiPickerContainerRef = useRef(null);

  const handleEmojiClick = ({ emoji }) => {
    setChatMessage((prev) => prev + emoji);
    input.current.focus();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.sendMessage({ body: chatMessage, channelId, username });
      setChatMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => input.current.focus(), [channelId, showEmojiPicker]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Box sx={{ marginTop: 'auto', px: 5, py: 2 }}>
      {showEmojiPicker && (
        <Box
          ref={emojiPickerContainerRef}
          sx={{
            width: '350px',
            height: '450px',
          }}
        >
          <EmojiPicker
            autoFocusSearch={false}
            onEmojiClick={handleEmojiClick}
            theme={theme.palette.mode === 'light' ? 'light' : 'dark'}
          />
        </Box>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="body"
          aria-label="Новое сообщение"
          placeholder={t('Messages.enterMessage')}
          inputRef={input}
          onChange={(e) => setChatMessage(e.target.value)}
          value={chatMessage}
          fullWidth
          size="small"
          InputProps={{
            sx: { p: 0 },
            startAdornment: (
              <IconButton type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} ref={emojiContainerRef}>
                <SentimentSatisfiedRoundedIcon />
              </IconButton>
            ),
            endAdornment: (
              <IconButton type="submit" disabled={!chatMessage.trim()}>
                <SendRoundedIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default InputChat;
