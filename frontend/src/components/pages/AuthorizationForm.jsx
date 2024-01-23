import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Container, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import useAuth from '../../hooks/useAuth.jsx';
import paths from '../../router/paths.js';
import useLocalStorage from '../../hooks/useLocalStorage.jsx';
import requests from '../../requests.js';

const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const AuthorizationForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setItem = useLocalStorage('setItem');
  const input = useRef(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async ({ username, password }) => {
      formik.setSubmitting(true);
      setAuthFailed(false);
      try {
        const response = await axios.post(requests.login(), { username, password });
        const user = response.data;
        setItem(user);
        auth.logIn(user.username);
        navigate(paths.mainPath());
      } catch (error) {
        formik.setSubmitting(false);
        if (error.response.status === 401) {
          setAuthFailed(true);
          input.current.select();
          return;
        }
        toast.error(`${t('PopUpAlerts.authorizationForm')}`, {
          icon: '🆘',
        });
        throw error;
      }
    },
  });

  return (
    <Box sx={{ height: '100vh' }}>
      <Box component="section" sx={{ display: 'flex', justifyContent: 'center', padding: '50px 0' }}>
        <Container
          maxWidth="sm"
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #ccc',
            boxShadow: '0 0.5rem 1.5rem rgba(0,0,0,0.2)',
            borderRadius: '5px',
            padding: '20px',
            margin: '30px',
          }}
        >
          <Typography variant="h5" component="div" sx={{ paddingBottom: '10px' }}>
            {t('AuthorizationForm.logIn')}
          </Typography>
          <TextField
            fullWidth
            size="small"
            id="username"
            label={t('AuthorizationForm.username')}
            variant="outlined"
            type="username"
            placeholder={t('AuthorizationForm.username')}
            onChange={formik.handleChange}
            value={formik.values.username}
            error={authFailed}
            autoFocus
            sx={{ paddingBottom: '10px' }}
            required
            inputRef={input}
          />
          <TextField
            fullWidth
            size="small"
            id="password"
            label={t('AuthorizationForm.password')}
            variant="outlined"
            type="password"
            placeholder={t('AuthorizationForm.password')}
            onChange={formik.handleChange}
            value={formik.values.password}
            error={authFailed}
            helperText={authFailed && t('ValidationErrors.authorizationForm.error')}
            sx={{ paddingBottom: '10px' }}
            required
          />
          <Button type="submit" aria-label={t('AuthorizationForm.buttonLogIn')} variant="contained">
            {t('AuthorizationForm.buttonLogIn')}
          </Button>
          <Box sx={{ textAlign: 'center', paddingTop: '10px' }}>
            <span>{t('AuthorizationForm.noAccount')}</span>
            <Link to={paths.signupPath()}>{t('AuthorizationForm.signUp')}</Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AuthorizationForm;
