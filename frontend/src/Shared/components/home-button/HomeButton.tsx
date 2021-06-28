import { ReactElement } from 'react'
import { Link } from 'react-router-dom';
import constantsRouter from '../../constants/payment/routes';

const { HOME } = constantsRouter;

export const HomeButton = (): ReactElement => {
    return (
        <Link to={ HOME.route }>
            
        </Link>
    )
}
