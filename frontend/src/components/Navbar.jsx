import React, { useState, useContext } from 'react';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LanguageIcon from '@mui/icons-material/Language';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routes from '../router/paths';
import useAuth from '../hooks/useAuth';
import { ColorModeContext } from '../contexts';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

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
        padding: '15px 30px',
      }}
    >
      <Typography
        variant="h4"
        component={Link}
        to={routes.mainPath()}
        sx={{
          textDecoration: 'none',
        }}
      >
        {t('Navbar.navBarBrand')}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        <IconButton onClick={handleClick}>
          <LanguageIcon
            id="basic-button"
            aria-controls={anchorEl ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? 'true' : undefined}
          />
        </IconButton>
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
          <Button
            onClick={handleAuthButton}
            variant="outlined"
            sx={{ ml: '10px', color: 'rgb(98, 205, 190)', background: 'none' }}
          >
            {t('Navbar.logOut')}
          </Button>
        )}
      </Box>
    </AppBar>
  );
};

export default Navbar;
