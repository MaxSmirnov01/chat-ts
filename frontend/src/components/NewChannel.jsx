import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NewChannels = (props) => {
  const {
    channel, currentChannelId, handleSelectChannel, handleRemoveChannel, handleRenameChannel,
  } = props;
  const { t } = useTranslation();

  return (
    <li key={channel.id} className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          onClick={() => handleSelectChannel(channel.id)}
          type="button"
          className="w-100 rounded-0 text-start btn text-truncate"
          variant={currentChannelId === channel.id ? 'secondary' : null}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        <Dropdown.Toggle
          split
          id="dropdown-split-basic"
          className="flex-grow-0"
          variant={currentChannelId === channel.id ? 'secondary' : null}
        >
          <span className="visually-hidden">{t('Channels.channelControl')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleRemoveChannel(channel.id)}>{t('Channels.removeChannel')}</Dropdown.Item>
          <Dropdown.Item onClick={() => handleRenameChannel(channel.id)}>{t('Channels.renameChannel')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default NewChannels;
