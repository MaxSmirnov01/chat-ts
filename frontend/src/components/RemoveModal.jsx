import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { hideModal } from '../slices/modalSlice';
import useSocket from '../hooks/useSocket';

const RemoveModal = () => {
  const dispatch = useDispatch();
  const api = useSocket();
  const { t } = useTranslation();

  const { modalIsOpen, channelId } = useSelector((state) => state.modal);

  const handleClose = () => dispatch(hideModal({ type: 'remove', channelId }));

  return (
    <Modal show={modalIsOpen} centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Modals.removeModal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('Modals.removeModal.areYouSure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleClose}>
            {t('Modals.removeModal.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await api.removeChannel({ id: channelId });
              handleClose();
              toast.success(`${t('PopUpAlerts.modal.removeChannel')}`, {
                icon: '👌',
              });
            }}
          >
            {t('Modals.removeModal.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
