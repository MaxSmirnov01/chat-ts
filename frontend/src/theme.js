const setDisign = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? 'rgb(41, 135, 121)' : '#3bc1ae',
      contrastText: mode === 'light' ? '#fff' : 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: mode === 'light' ? '#fff' : '#1c1c1c',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h4: {
      color: '#3bc1ae',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#2d2c2c',
          color: '#fff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(59, 193, 174, 0.5)',
          background: 'linear-gradient(45deg, rgba(59, 193, 174, 0.5) 30%, #3bc1ae  90%)',
          color: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#fff',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#3bc1ae',
        },
      },
    },
  },
});

export default setDisign;
