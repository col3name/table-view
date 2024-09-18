import {Link} from 'react-router-dom';

import {H2} from '../app/shared/ui/typography';
import {Routes} from '../Routes';

export const NotFoundPage = () => {
    return (
        <div>
            <H2 textAlign="center">Oops!</H2>
            <Link to={Routes.Home}>Home</Link>
            <p>Sorry, an unexpected error has occurred.</p>
        </div>
    );
};
