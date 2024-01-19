const en = {
  translation: {
    AuthorizationForm: {
      logIn: 'Log In',
      username: 'Username',
      password: 'Password',
      buttonLogIn: 'Log In',
      noAccount: 'No account? ',
      signUp: 'Sign Up',
    },
    Signup: {
      signUp: 'Sign Up',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm password',
      buttonSignUp: 'Register',
    },
    NotFound: {
      notFoundPage: 'Not found page',
      youCanGo: 'I recommend you start from the',
      mainPage: 'main page',
    },
    Navbar: {
      navBarBrand: 'Hexlet Chat',
      logOut: 'Log Out',
      en: 'English',
      ru: 'Русский',
      lang: 'Lang',
    },
    Channels: {
      channels: 'Channels',
      removeChannel: 'Remove',
      renameChannel: 'Rename',
      channelControl: 'Channel control',
    },
    Messages: {
      count_one: '{{count}} message',
      count_other: '{{count}} messages',
      enterMessage: 'Enter a message...',
      submit: 'Submit',
    },
    Modals: {
      addModal: {
        addChannel: 'Add channel',
        cancel: 'Cancel',
        submit: 'Submit',
        channelName: 'Channel name',
      },
      removeModal: {
        removeChannel: 'Remove channel',
        areYouSure: 'Are you sure?',
        cancel: 'Cancel',
        remove: 'Remove',
      },
      renameModal: {
        renameChannel: 'Rename channel',
        cancel: 'Cancel',
        submit: 'Submit',
        channelName: 'Channel name',
      },
    },
    ValidationErrors: {
      signUp: {
        username: 'From 3 to 20 characters',
        password: 'Minimum 6 characters',
        confirmPassword: "Passwords don't match",
        required: 'Required field',
        regFailed: 'This user already exists',
      },
      authorizationForm: {
        error: 'Invalid username or password',
      },
      addModal: {
        name: 'From 3 to 20 characters',
        unique: 'Must be unique',
      },
      renameModal: {
        name: 'From 3 to 20 characters',
        unique: 'Must be unique',
      },
    },
    PopUpAlerts: {
      mainPage: 'The server is not responding',
      modal: {
        addChannel: 'Channel created',
        removeChannel: 'Channel removed',
        renameChannel: 'Channel renamed',
      },
      authorizationForm: 'Connection error',
      signUp: 'Connection error',
    },
  },
};

export default en;
