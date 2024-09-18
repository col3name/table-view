import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';

export const Routes = {
  Home: '/',
};

const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
