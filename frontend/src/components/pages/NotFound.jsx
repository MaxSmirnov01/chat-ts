import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, CardMedia } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import notFound from '../../assets/images/notFound.png';
import paths from '../../router/paths';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ marginTop: '30px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CardMedia
          component="img"
          src={notFound}
          alt={t('NotFound.notFoundPage')}
          sx={{ width: '382px', maxWidth: '100%', height: 'auto' }}
        />
      </Box>
      <Box sx={{ textAlign: 'center', paddingTop: '10px' }}>
        <Button
          component={Link}
          to={paths.mainPath()}
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{ fontWeight: 'bold' }}
        >
          {t('NotFound.mainPage')}
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
