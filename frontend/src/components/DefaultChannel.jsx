import React from 'react';
import { ListItemIcon, ListItemButton, ListItemText, Typography } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const DefaultChannels = ({ channel, currentChannelId, handleSelectChannel }) => (
  <ListItemButton
    key={channel.id}
    onClick={() => handleSelectChannel(channel.id)}
    selected={currentChannelId === channel.id}
    sx={{ flexWrap: 'wrap' }}
  >
    <ListItemIcon sx={{ minWidth: '30px' }}>
      <BookmarkBorderIcon color="error" />
    </ListItemIcon>
    <ListItemText>
      <Typography noWrap>{channel.name}</Typography>
    </ListItemText>
  </ListItemButton>
);

export default DefaultChannels;
