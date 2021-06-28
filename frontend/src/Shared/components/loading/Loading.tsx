import { ReactElement } from 'react'
import PropTypes from 'prop-types';

import './index.css';

export const Loading = (  { loading, message }  : any ) : ReactElement  => {
    return (
        <div className="loading">
            <div className="loading__box">
            { loading && <p className="loading__text"> { message } </p> }
            <p>Please wait just a <span className="blink-text">few</span>.</p>     
            </div> 
        </div>
    )
}


Loading.propTypes = {
    stateLoading : PropTypes.object
}