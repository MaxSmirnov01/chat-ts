import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import EmojiPicker from 'emoji-picker-react';
import cn from 'classnames';
import leoProfanity from 'leo-profanity';
import useSocket from '../hooks/useSocket';
import useAuth from '../hooks/useAuth';

const Messages = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const input = useRef(null);
  const emojiContainerRef = useRef(null);
  const chatRef = useRef(null);
  const api = useSocket();
  const { t } = useTranslation();
  const { username } = useAuth();

  const filter = leoProfanity;

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
      const message = filter.clean(body);

      try {
        await api.sendMessage({ body: message, channelId, username });
        formik.resetForm();
        setIsButtonDisabled(true);
      } catch (error) {
        formik.setSubmitting(false);
        console.log(error);
      }
    },
  });

  const handleClickOutside = (e) => {
    if (emojiContainerRef.current && !emojiContainerRef.current.contains(e.target)) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => input.current.focus(), [channelId, formik.isSubmitting, showEmojiPicker]);
  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messagesFilteredById]);
  useEffect(() => {
    // Добавляем обработчик события клика при монтировании компонента
    document.addEventListener('click', handleClickOutside);

    // Удаляем обработчик события клика при размонтировании компонента
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{channelName && `# ${channelName.name}`}</b>
          </p>
          <span className="text-muted">{t('Messages.count', { count: messagesFilteredById.length })}</span>
        </div>
        <div ref={chatRef} id="messages-box" className="chat-messages overflow-auto px-5">
          {messagesFilteredById.map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>
              {`: ${message.body}`}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiClick={({ emoji }) => {
                formik.setFieldValue('body', `${formik.values.body} ${emoji} `);
                setShowEmojiPicker(!showEmojiPicker);
              }}
            />
          )}
          <Form noValidate className="py-0 border rounded-2" onSubmit={formik.handleSubmit} ref={emojiContainerRef}>
            <InputGroup className={cn({ 'has-validation': isButtonDisabled })}>
              <Button type="button" variant="outline-light" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                🙂
              </Button>
              <Form.Control
                name="body"
                aria-label="Новое сообщение"
                placeholder={t('Messages.enterMessage')}
                className="border-0 p-2 ps-2"
                ref={input}
                onChange={formik.handleChange}
                value={formik.values.body}
              />
              <Button
                type="submit"
                className="btn-group-vertical"
                variant="outline-primary"
                disabled={!formik.values.body.length}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path fillRule="evenodd" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                </svg>
                <span className="visually-hidden">{t('Messages.submit')}</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
