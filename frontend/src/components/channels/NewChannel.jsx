import React, { useState } from 'react';
import { ListItemIcon, ListItemButton, ListItemText, Menu, MenuItem, Box, Typography } from '@mui/material';
import StarPurple500RoundedIcon from '@mui/icons-material/StarPurple500Rounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useTranslation } from 'react-i18next';

const NewChannels = (props) => {
  const { channel, currentChannelId, handleSelectChannel, handleRemoveChannel, handleRenameChannel } = props;
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(!anchorEl);
  };

  return (
    <ListItemButton
      key={channel.id}
      onClick={() => handleSelectChannel(channel.id)}
      selected={currentChannelId === channel.id}
    >
      <ListItemIcon sx={{ minWidth: '30px' }}>
        {currentChannelId === channel.id ? (
          <StarRateRoundedIcon color="warning" />
        ) : (
          <StarPurple500RoundedIcon color="warning" />
        )}
      </ListItemIcon>
      <ListItemText>
        <Typography noWrap>{channel.name}</Typography>
      </ListItemText>
      <Box>
        <KeyboardArrowDownRoundedIcon onClick={handleClick} sx={{ paddingTop: '5px' }} />
        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              handleRemoveChannel(channel.id);
              handleClose();
            }}
            sx={{ gap: '10px' }}
          >
            <DeleteOutlineRoundedIcon />
            {t('Channels.removeChannel')}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleRenameChannel(channel.id);
              handleClose();
            }}
            sx={{ gap: '10px' }}
          >
            <EditOutlinedIcon />
            {t('Channels.renameChannel')}
          </MenuItem>
        </Menu>
      </Box>
    </ListItemButton>
  );
};

export default NewChannels;
