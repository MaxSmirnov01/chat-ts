import React, { useEffect, useRef } from 'react';
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
import useAuth from '../../hooks/useAuth';

const AddModal = () => {
  const dispatch = useDispatch();
  const api = useSocket();
  const { t } = useTranslation();
  const { username } = useAuth();
  const input = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (input.current) {
        input.current.focus();
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const modalIsOpen = useSelector((state) => state.modal.modalIsOpen);
  const channelNames = useSelector(selectChannelNames);

  const handleClose = () => dispatch(hideModal({ type: 'add', channelId: null }));

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(3, `${t('ValidationErrors.addModal.name')}`)
      .max(40, `${t('ValidationErrors.addModal.name')}`)
      .notOneOf(channelNames, `${t('ValidationErrors.addModal.unique')}`),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema,
    onSubmit: async ({ name }) => {
      formik.setSubmitting(true);

      try {
        await api.addChannel({ name, username });
        handleClose();
        toast.success(`${t('PopUpAlerts.modal.addChannel')}`, {
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
      <DialogTitle>{t('Modals.addModal.addChannel')}</DialogTitle>
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
          label={t('Modals.addModal.channelName')}
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
        <Button onClick={handleClose}>{t('Modals.addModal.cancel')}</Button>
        <Button type="submit">{t('Modals.addModal.submit')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
