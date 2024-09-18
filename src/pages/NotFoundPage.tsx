import { Link, useRouteError } from 'react-router-dom';

import { H2 } from '../app/shared/ui/typography';
import { Routes } from '../Routes';

export const NotFoundPage = () => {
  const error = useRouteError();

  return (
    <div>
      <H2 textAlign="center">Oops!</H2>
      <Link href={Routes.Home}>Home</Link>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
