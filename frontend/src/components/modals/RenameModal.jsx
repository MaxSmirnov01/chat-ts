import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { hideModal } from '../../slices/modalSlice';
import { selectChannelNames } from '../../slices/channelsSlice';
import useSocket from '../../hooks/useSocket';

const RenameModal = () => {
  const dispatch = useDispatch();
  const api = useSocket();
  const input = useRef(null);
  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (input.current) {
        input.current.select();
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

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
      .max(40, `${t('ValidationErrors.renameModal.name')}`)
      .notOneOf(channelNames, `${t('ValidationErrors.renameModal.unique')}`),
  });

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema: schema,
    onSubmit: async ({ name }) => {
      formik.setSubmitting(true);

      try {
        await api.renameChannel({ id: channelId, name });
        handleClose();
        toast.success(`${t('PopUpAlerts.modal.renameChannel')}`, {
          icon: '👌',
          position: 'bottom-right',
          theme: theme.palette.mode === 'light' ? 'light' : 'dark',
        });
      } catch (error) {
        formik.setSubmitting(false);
        console.log(error);
      }
    },
  });

  return (
    <Dialog
      open={modalIsOpen}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: formik.handleSubmit,
      }}
    >
      <DialogTitle>{t('Modals.renameModal.renameChannel')}</DialogTitle>
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
        <TextField
          required
          margin="dense"
          id="name"
          name="name"
          label={t('Modals.renameModal.channelName')}
          type="name"
          fullWidth
          variant="standard"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={!!formik.errors.name}
          helperText={formik.errors.name}
          inputRef={input}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('Modals.renameModal.cancel')}</Button>
        <Button type="submit">{t('Modals.renameModal.submit')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenameModal;
