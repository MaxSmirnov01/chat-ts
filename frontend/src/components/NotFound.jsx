import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFound from '../assets/images/notFound.png';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('NotFound.notFoundPage')} className="img-fluid h-50" src={notFound} />
      <h1 className="h4 text-muted">{t('NotFound.notFoundPage')}</h1>
      <p className="text-muted">
        {`${t('NotFound.youCanGo')} `}
        <Link to="/">{t('NotFound.mainPage')}</Link>
      </p>
    </div>
  );
};

export default NotFound;
