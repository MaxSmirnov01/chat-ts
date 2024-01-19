import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import routes from '../routes';
import useAuth from '../hooks/useAuth';
import useLocalStorage from '../hooks/useLocalStorage';
import avatar2 from '../assets/images/avatar2.jpg';
import requests from '../requests.js';

const Signup = () => {
  const [regFailed, setRegFailed] = useState(false);
  const input = useRef(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const setItem = useLocalStorage('setItem');

  useEffect(() => input.current.focus(), []);

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
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async ({ username, password }) => {
      formik.setSubmitting(true);
      setRegFailed(false);
      try {
        const response = await axios.post(requests.signUp(), { username, password });
        const user = response.data;
        setItem(user);
        auth.logIn(user.username);
        navigate(routes.mainPath());
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
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={avatar2} className="rounded-circle" alt={t('Signup.signUp')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('Signup.signUp')}</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="username"
                    placeholder={t('Signup.username')}
                    name="username"
                    required
                    id="username"
                    autoComplete="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    ref={input}
                    isInvalid={(formik.touched.username && formik.errors.username) || regFailed}
                  />
                  <Form.Label htmlFor="username">{t('Signup.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder={t('Signup.password')}
                    name="password"
                    required
                    id="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={(formik.touched.password && formik.errors.password) || regFailed}
                  />
                  <Form.Label htmlFor="password">{t('Signup.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder={t('Signup.confirmPassword')}
                    name="confirmPassword"
                    required
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={(formik.touched.confirmPassword && formik.errors.confirmPassword)
                      || regFailed}
                  />
                  <Form.Label htmlFor="confirmPassword">{t('Signup.confirmPassword')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {regFailed === false ? formik.errors.confirmPassword : t('ValidationErrors.signUp.regFailed')}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Button type="submit" className="w-100" variant="outline-primary">
                  {t('Signup.buttonSignUp')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
