import { useEffect, useContext, useState } from "react";
import { ResponsePaymentListContext } from "../Providers/Response/response.payment.list.provider";
import { listPayments } from "../Services/payment/listPayments";

export const useListPayments = () => {
    
    const [ loading, setLoading ] = useState(  true )
    const { response, setResponse } = useContext(ResponsePaymentListContext);

        useEffect( () => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setTimeout( () => {
            listPayments( signal ).then( ({ payments, participants, total_balance, debtors } ) => {
                setLoading( false )
                setResponse({ payments, participants, total_balance, debtors });
            }).catch( error => {
                setLoading( false )
                setResponse({ payments: [], participants: [], total_balance: [], debtors : [] });
            })
        }, 1500);
        return () => { abortController.abort() }
    }, [  ])

    return { response, loading };
} 