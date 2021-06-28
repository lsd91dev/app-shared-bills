import { ReactElement } from 'react';
import PropTypes from 'prop-types';

export const Debtors = ( { debtors } : any ) : ReactElement => {
    return (
        <div>
            <h3> Debtors </h3> 
            { debtors.map( ( debtor : any, key : any ) => {
               return  (
                   <div key={ key }> 
                       <p> { debtor.payer } owes to  <span> { debtor.debtor_name } </span> <span> ( { debtor.amount } )</span></p>
                   </div>
               );
            })}
        </div>
    )
}


Debtors.propTypes = {
    debtors : PropTypes.array
}