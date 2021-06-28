// css

import './index.css';

// React

import React, { useContext } from 'react';

// Interfaces

import { PaymentInterface } from '../../../Interfaces/payment.interface';

// Components

import { 
    PaymentContext, 
    Loading, Payment, CreatePaymentButton } from '..';

import { Participant } from '../../Participant'
import { ParticipantInterface } from '../../../Interfaces/participant.interface';
import { Balance } from '../../../Shared/components/balance/Balance';
import { Debtors } from '../../../Shared/components/debtors/Debtors';
    
    
    export const Payments = () : React.ReactElement => {
        

    const { useListPayments } = useContext(PaymentContext);
    const { response, loading } = useListPayments();
    const { payments, participants, total_balance, debtors } = response;

    const stateLoading = {
        loading,
        message: 'Retrieving your payments from server.'
    }
    
    return (
        <div className="wrapper">
             <h1 className="wrapper__title">
                List of all your payments
            </h1>
            { loading && <Loading  { ...stateLoading } /> } 


            <CreatePaymentButton />

            <section className="list__wrapper">

                { payments?.map( ( payment : PaymentInterface  )  =>  {
                    return ( 
                    <div className="list__item" key={ payment._id } >
                    <Payment { ...payment } />  

                    { participants?.map( ( participant : ParticipantInterface  )  =>  {
                        if ( payment._id === participant.payment_id){
                        return <Participant { ...participant } { ...payment }  key={ participant._id } /> }} ) } 
                    <hr/>
                    </div> ) 

                } ) }
            </section> 
                
        <Balance balance={ total_balance } />

        <Debtors debtors= { debtors } />
            
        </div>
    )
}
