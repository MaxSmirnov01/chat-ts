import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { hideModal } from '../../slices/modalSlice';
import useSocket from '../../hooks/useSocket';

const RemoveModal = () => {
  const dispatch = useDispatch();
  const api = useSocket();
  const { t } = useTranslation();
  const theme = useTheme();

  const { modalIsOpen, channelId } = useSelector((state) => state.modal);

  const handleClose = () => dispatch(hideModal({ type: 'remove', channelId }));

  const handleRemove = async () => {
    await api.removeChannel({ id: channelId });
    handleClose();
    toast.success(`${t('PopUpAlerts.modal.removeChannel')}`, {
      icon: '👌',
      position: 'bottom-right',
      theme: theme.palette.mode === 'light' ? 'light' : 'dark',
    });
  };

  return (
    <Dialog
      open={modalIsOpen}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{t('Modals.removeModal.removeChannel')}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 14,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{t('Modals.removeModal.areYouSure')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('Modals.removeModal.cancel')}</Button>
        <Button onClick={handleRemove} autoFocus>
          {t('Modals.removeModal.remove')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveModal;
