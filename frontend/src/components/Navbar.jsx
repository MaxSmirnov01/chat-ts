import React from 'react';
import {
  Navbar, Container, Button, Dropdown, DropdownButton,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import useAuth from '../hooks/useAuth';

const NavbarComponent = () => {
  const auth = useAuth();
  const { t, i18n } = useTranslation();

  const handleAuthButton = () => {
    auth.logOut();
  };

  const handleLangSwitch = (e) => {
    const lang = e.target.dataset.testid;
    i18n.changeLanguage(lang);
  };

  return (
    <Navbar bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={routes.mainPath()}>
          {t('Navbar.navBarBrand')}
        </Navbar.Brand>
        <DropdownButton title={t('Navbar.lang')} id="bg-nested-dropdown" className="ml-auto" variant="link">
          <Dropdown.Item onClick={handleLangSwitch} data-testid="ru">
            {t('Navbar.ru')}
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLangSwitch} data-testid="en">
            {t('Navbar.en')}
          </Dropdown.Item>
        </DropdownButton>
        {auth.loggedIn && <Button onClick={handleAuthButton}>{t('Navbar.logOut')}</Button>}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
