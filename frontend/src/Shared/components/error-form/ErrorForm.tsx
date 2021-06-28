import { ReactElement } from 'react'
import PropTypes from 'prop-types'

import './index.css';

export const ErrorForm = ( { message } : any ): ReactElement => {
    return (
        <div className="form__error">
            <p> { message } </p>
        </div>
    )
}


ErrorForm.propTypes = {
    message : PropTypes.string
}