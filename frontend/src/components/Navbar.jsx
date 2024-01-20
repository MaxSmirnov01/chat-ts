import React, { useState } from 'react';
import { AppBar, Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routes from '../router/paths';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const handleAuthButton = () => {
    auth.logOut();
  };

  const handleLangSwitch = (e) => {
    const lang = e.target.dataset.testid;
    i18n.changeLanguage(lang);
    setAnchorEl(!anchorEl);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(!anchorEl);
  };

  return (
    <AppBar
      position="static"
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
      }}
    >
      <Typography
        variant="h4"
        component={Link}
        to={routes.mainPath()}
        sx={{
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {t('Navbar.navBarBrand')}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* <ThemeButton /> */}
        <LanguageIcon
          id="basic-button"
          aria-controls={anchorEl ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl ? 'true' : undefined}
          onClick={handleClick}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleLangSwitch} data-testid="ru">
            {t('Navbar.ru')}
          </MenuItem>
          <MenuItem onClick={handleLangSwitch} data-testid="en">
            {t('Navbar.en')}
          </MenuItem>
        </Menu>
        {auth.loggedIn && (
          <Button onClick={handleAuthButton} variant="outlined" color="inherit">
            {t('Navbar.logOut')}
          </Button>
        )}
      </Box>
    </AppBar>
  );
};

export default Navbar;
