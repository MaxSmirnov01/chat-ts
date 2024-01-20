import AuthorizationForm from '../components/pages/AuthorizationForm';
import Signup from '../components/pages/Signup';
import NotFound from '../components/pages/NotFound';
import MainPage from '../components/pages/MainPage';
import PrivateRoute from '../components/PrivateRoute';
import paths from './paths';

const routes = [
  {
    path: paths.mainPath(),
    element: (
      <PrivateRoute>
        <MainPage />
      </PrivateRoute>
    ),
  },
  {
    path: paths.loginPath(),
    Component: AuthorizationForm,
  },
  {
    path: paths.signupPath(),
    Component: Signup,
  },
  {
    path: paths.notFoundPath(),
    Component: NotFound,
  },
];

export default routes;
