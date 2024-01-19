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
import useAuth from '../hooks/useAuth';

const AddModal = () => {
  const dispatch = useDispatch();
  const input = useRef(null);
  const api = useSocket();
  const { t } = useTranslation();
  const { username } = useAuth();

  const filter = leoProfanity;

  const modalIsOpen = useSelector((state) => state.modal.modalIsOpen);
  const channelNames = useSelector(selectChannelNames);

  useEffect(() => input.current.focus(), []);

  const handleClose = () => dispatch(hideModal({ type: 'add', channelId: null }));

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(3, `${t('ValidationErrors.addModal.name')}`)
      .max(20, `${t('ValidationErrors.addModal.name')}`)
      .notOneOf(channelNames, `${t('ValidationErrors.addModal.unique')}`),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema,
    onSubmit: async ({ name }) => {
      formik.setSubmitting(true);
      const newChannel = filter.clean(name);

      try {
        await api.addChannel({ name: newChannel, username });
        handleClose();
        toast.success(`${t('PopUpAlerts.modal.addChannel')}`, {
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
        <Modal.Title>{t('Modals.addModal.addChannel')}</Modal.Title>
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
              {t('Modals.addModal.channelName')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={handleClose}>
                {t('Modals.addModal.cancel')}
              </Button>
              <Button type="submit" variant="primary">
                {t('Modals.addModal.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
