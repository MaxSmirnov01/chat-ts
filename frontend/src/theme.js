const setDisign = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? 'rgb(41, 135, 121)' : 'rgb(98, 205, 190)',
      contrastText: mode === 'light' ? '#fff' : 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: mode === 'light' ? '#fff' : '#1c1c1c',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h4: {
      color: 'rgb(98, 205, 190)',
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
          background: 'linear-gradient(45deg, rgba(59, 193, 174, 0.5) 30%, rgb(98, 205, 190)  90%)',
          color: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#fff',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'rgb(98, 205, 190)',
        },
      },
    },
  },
});

export default setDisign;
