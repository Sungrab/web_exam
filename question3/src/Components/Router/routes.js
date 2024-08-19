import HomePage from '../Pages/HomePage';
import creat from '../Pages/NewPage';
import manage from '../Pages/manage';

const routes = {
  '/': HomePage,
  '/queries/create': creat,
  '/manage': manage,
};

export default routes;
