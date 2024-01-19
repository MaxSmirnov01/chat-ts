import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import leoProfanity from 'leo-profanity';
import { hideModal } from '../slices/modalSlice';
import { selectChannelNames } from '../slices/channelsSlice';
import useSocket from '../hooks/useSocket';

const RenameModal = () => {
  const dispatch = useDispatch();
  const api = useSocket();
  const input = useRef(null);
  const { t } = useTranslation();

  const filter = leoProfanity;

  useEffect(() => input.current.select(), []);

  const { modalIsOpen, channelId } = useSelector((state) => state.modal);
  const currentChannel = useSelector((state) => {
    const { channels } = state.channels;
    return channels.find((channel) => channel.id === channelId);
  });
  const channelNames = useSelector(selectChannelNames);

  const handleClose = () => dispatch(hideModal({ type: 'rename', channelId }));

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(3, `${t('ValidationErrors.renameModal.name')}`)
      .max(20, `${t('ValidationErrors.renameModal.name')}`)
      .notOneOf(channelNames, `${t('ValidationErrors.renameModal.unique')}`),
  });

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema: schema,
    onSubmit: async ({ name }) => {
      formik.setSubmitting(true);
      const renameChannel = filter.clean(name);

      try {
        await api.renameChannel({ id: channelId, name: renameChannel });
        handleClose();
        toast.success(`${t('PopUpAlerts.modal.renameChannel')}`, {
          icon: '👌',
        });
      } catch (error) {
        formik.setSubmitting(false);
        console.log(error);
      }
    },
  });

  return (
    <Modal show={modalIsOpen} centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Modals.renameModal.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              ref={input}
              value={formik.values.name}
              onChange={formik.handleChange}
              id="name"
              className="mb-2"
              isInvalid={!!formik.errors.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name">
              {t('Modals.renameModal.channelName')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={handleClose}>
                {t('Modals.renameModal.cancel')}
              </Button>
              <Button type="submit" variant="primary">
                {t('Modals.renameModal.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
