const ru = {
  translation: {
    AuthorizationForm: {
      logIn: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      buttonLogIn: 'Войти',
      noAccount: 'Нет аккаунта? ',
      signUp: 'Регистрация',
    },
    Signup: {
      signUp: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      buttonSignUp: 'Зарегистрироваться',
    },
    NotFound: {
      notFoundPage: 'Страница не найдена',
      youCanGo: 'Но вы можете перейти',
      mainPage: 'на главную страницу',
    },
    Navbar: {
      navBarBrand: 'Hexlet Chat',
      logOut: 'Выйти',
      en: 'English',
      ru: 'Русский',
      lang: 'Язык',
    },
    Channels: {
      channels: 'Каналы',
      removeChannel: 'Удалить',
      renameChannel: 'Переименовать',
      channelControl: 'Управление каналом',
    },
    Messages: {
      count_zero: '{{count}} сообщений',
      count_one: '{{count}} сообщение',
      count_few: '{{count}} сообщения',
      count_many: '{{count}} сообщений',
      enterMessage: 'Введите сообщение...',
      submit: 'Отправить',
    },
    Modals: {
      addModal: {
        addChannel: 'Добавить канал',
        cancel: 'Отменить',
        submit: 'Отправить',
        channelName: 'Имя канала',
      },
      removeModal: {
        removeChannel: 'Удалить канал',
        areYouSure: 'Уверены?',
        cancel: 'Отменить',
        remove: 'Удалить',
      },
      renameModal: {
        renameChannel: 'Переименовать канал',
        cancel: 'Отменить',
        submit: 'Отправить',
        channelName: 'Имя канала',
      },
    },
    ValidationErrors: {
      signUp: {
        username: 'От 3 до 20 символов',
        password: 'Не менее 6 символов',
        confirmPassword: 'Пароли должны совпадать',
        required: 'Обязательное поле',
        regFailed: 'Такой пользователь уже существует',
      },
      authorizationForm: {
        error: 'Неверные имя пользователя или пароль',
      },
      addModal: {
        name: 'От 3 до 20 символов',
        unique: 'Должно быть уникальным',
      },
      renameModal: {
        name: 'От 3 до 20 символов',
        unique: 'Должно быть уникальным',
      },
    },
    PopUpAlerts: {
      mainPage: 'Сервер не отвечает',
      modal: {
        addChannel: 'Канал создан',
        removeChannel: 'Канал удалён',
        renameChannel: 'Канал переименован',
      },
      authorizationForm: 'Ошибка соединения',
      signUp: 'Ошибка соединения',
    },
  },
};

export default ru;
