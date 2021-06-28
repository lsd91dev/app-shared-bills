import { ReactElement } from 'react'
import  PropTypes  from 'prop-types';

import '../index.css';
import './index.css';

export const Participant = ( { name, amount, owe, owner_payment }  : any ) : ReactElement => {

    return ( 
        <div className="list__participant fadeIn">
            
            <div className="list__group-field">
                <span className="list__field"> Participant's name </span> <span className="list__field--name"> { name } </span> 
            </div>

            <div className="list__group-field">
                <span className="list__field"> Owes to { owner_payment } : </span> <span className="list__field--name"> { amount } </span>    
            </div>
        </div> )
}

Participant.propTypes = {
    participant : PropTypes.object,
    payment: PropTypes.object,
}
