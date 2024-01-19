import React from 'react';
import { Button } from 'react-bootstrap';

const DefaultChannels = (props) => {
  const { channel, currentChannelId, handleSelectChannel } = props;

  return (
    <li key={channel.id} className="nav-item w-100">
      <Button
        onClick={() => handleSelectChannel(channel.id)}
        type="button"
        className="w-100 rounded-0 text-start btn"
        variant={currentChannelId === channel.id ? 'secondary' : null}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </li>
  );
};

export default DefaultChannels;
