import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { constantsRouter } from '../../../Pages/Payment';

import './index.css';

export const CreatePaymentButton = () : ReactElement => {

    const { NEW_PAYMENT } = constantsRouter;

    return (
        <div className="wrapper__link">
                <Link to={ NEW_PAYMENT.route } className="wrapper__link--button"> Create new payment </Link>
        </div>
    )
}
