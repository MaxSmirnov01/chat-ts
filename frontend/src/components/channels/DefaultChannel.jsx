import React from 'react';
import { ListItemIcon, ListItemButton, ListItemText, Typography, useTheme } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import useWindowWidth from '../../hooks/useWindowWidth';

const DefaultChannels = ({ channel, currentChannelId, handleSelectChannel, handleDrawerToggle }) => {
  const theme = useTheme();
  const windowWidth = useWindowWidth();

  return (
    <ListItemButton
      key={channel.id}
      onClick={() => {
        handleSelectChannel(channel.id);
        if (windowWidth <= theme.breakpoints.values.sm) {
          handleDrawerToggle();
        }
      }}
      selected={currentChannelId === channel.id}
      sx={{ flexWrap: 'wrap' }}
    >
      <ListItemIcon sx={{ minWidth: '30px' }}>
        {currentChannelId === channel.id ? <BookmarkIcon color="error" /> : <BookmarkBorderIcon color="error" />}
      </ListItemIcon>
      <ListItemText>
        <Typography noWrap>{channel.name}</Typography>
      </ListItemText>
    </ListItemButton>
  );
};

export default DefaultChannels;
