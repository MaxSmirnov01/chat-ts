import React, { useState, useRef, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import routes from '../routes';
import useLocalStorage from '../hooks/useLocalStorage';
import requests from '../requests.js';
import avatar1 from '../assets/images/avatar1.jpg';

const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const AuthorizationForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const input = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setItem = useLocalStorage('setItem');

  useEffect(() => input.current.focus(), []);

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
        navigate(routes.mainPath());
      } catch (error) {
        formik.setSubmitting(false);
        if (error.response.status === 401) {
          setAuthFailed(true);
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
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={avatar1} className="rounded-circle" alt={t('AuthorizationForm.logIn')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('AuthorizationForm.logIn')}</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="username"
                    placeholder={t('AuthorizationForm.username')}
                    required
                    autoComplete="username"
                    id="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={authFailed}
                    ref={input}
                  />
                  <Form.Label htmlFor="username">{t('AuthorizationForm.username')}</Form.Label>
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="password"
                    required
                    name="password"
                    autoComplete="current-password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authFailed}
                  />
                  <Form.Label htmlFor="password">{t('AuthorizationForm.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t('ValidationErrors.authorizationForm.error')}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Button type="submit" className="mb-3 w-100" variant="outline-primary">
                  {t('AuthorizationForm.buttonLogIn')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('AuthorizationForm.noAccount')}</span>
                <Link to={routes.signupPath()}>{t('AuthorizationForm.signUp')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationForm;
