import { ReactElement } from 'react'
import { Link } from 'react-router-dom';
import  PropTypes  from 'prop-types';

import './index.css';
import '../index.css';

export const Payment = ( { _id, owner_payment, total_amount, description  }  : any ) : ReactElement => {


    return ( 
        <div className="list__payment fadeIn">
            
            <div className="list__group-field">
                <span className="list__field"> Owner's payment </span> <span className="list__field--name"> { owner_payment } </span> 
            </div>

            <div className="list__group-field">
                <span className="list__field"> Description </span> <span className="list__field--name"> { description } </span>    
            </div>

            <hr/>
            <div className="list__group-field">
                <span className="list__field"> Total amount paid </span> <span className="list__field--name"> { total_amount } </span>
            </div>
            
            <Link to={`/participant/new/${ _id }`} className="list__link list__button--add-friend"> Add friend to this payment </Link>
            {/* <Link to={`/payment/${_id}`} className="list__link"> See more </Link> */}
        </div> )
}

Payment.propTypes = {
    item : PropTypes.object
}
