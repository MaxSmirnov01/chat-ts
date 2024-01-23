import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Container, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import paths from '../../router/paths.js';
import useAuth from '../../hooks/useAuth.jsx';
import useLocalStorage from '../../hooks/useLocalStorage.jsx';
import requests from '../../requests.js';

const Signup = () => {
  const [regFailed, setRegFailed] = useState(false);
  const input = useRef(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const setItem = useLocalStorage('setItem');

  const schema = Yup.object().shape({
    username: Yup.string()
      .min(3, `${t('ValidationErrors.signUp.username')}`)
      .max(20, `${t('ValidationErrors.signUp.username')}`)
      .required(`${t('ValidationErrors.signUp.required')}`),
    password: Yup.string()
      .min(6, `${t('ValidationErrors.signUp.password')}`)
      .required(`${t('ValidationErrors.signUp.required')}`),
    confirmPassword: Yup.string()
      .required(`${t('ValidationErrors.signUp.required')}`)
      .oneOf([Yup.ref('password')], `${t('ValidationErrors.signUp.confirmPassword')}`),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async ({ username, password }) => {
      formik.setSubmitting(true);
      setRegFailed(false);
      try {
        const response = await axios.post(requests.signUp(), { username, password });
        const user = response.data;
        setItem(user);
        auth.logIn(user.username);
        navigate(paths.mainPath());
      } catch (error) {
        formik.setSubmitting(false);
        if (error.response.status === 409) {
          setRegFailed(true);
          input.current.select();
          return;
        }
        toast.error(`${t('PopUpAlerts.signUp')}`, {
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
            {t('Signup.signUp')}
          </Typography>
          <TextField
            fullWidth
            size="small"
            id="username"
            label={t('Signup.username')}
            variant="outlined"
            type="username"
            placeholder={t('Signup.username')}
            onChange={formik.handleChange}
            onBlur={() => formik.validateField('username')}
            value={formik.values.username}
            error={!!formik.errors.username || regFailed}
            helperText={formik.errors.username}
            autoFocus
            autoComplete="username"
            sx={{ paddingBottom: '10px' }}
            required
            inputRef={input}
          />
          <TextField
            fullWidth
            size="small"
            id="password"
            label={t('Signup.password')}
            variant="outlined"
            type="password"
            placeholder={t('Signup.password')}
            onChange={formik.handleChange}
            onBlur={() => formik.validateField('password')}
            value={formik.values.password}
            error={!!formik.errors.password || regFailed}
            helperText={formik.errors.password}
            sx={{ paddingBottom: '10px' }}
            required
            autoComplete="new-password"
          />
          <TextField
            fullWidth
            size="small"
            id="confirmPassword"
            label={t('Signup.confirmPassword')}
            variant="outlined"
            type="password"
            placeholder={t('Signup.confirmPassword')}
            onChange={formik.handleChange}
            onBlur={() => formik.validateField('confirmPassword')}
            value={formik.values.confirmPassword}
            error={!!formik.errors.confirmPassword || regFailed}
            helperText={regFailed === false ? formik.errors.confirmPassword : t('ValidationErrors.signUp.regFailed')}
            sx={{ paddingBottom: '10px' }}
            required
            autoComplete="new-password"
          />
          <Button type="submit" aria-label={t('Signup.buttonSignUp')} variant="contained">
            {t('Signup.buttonSignUp')}
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Signup;
