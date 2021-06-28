import { useEffect, useContext } from "react";
import { ResponsePaymentContext } from "../Providers/Response/response.payment.provider";
import { getPayment } from "../Services/payment/getPayment";

export const useGetPayment = (id: string) => {
    
    const { responsePayment, setResponsePayment } = useContext(ResponsePaymentContext);

    useEffect( () => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setTimeout( () => {
             getPayment( id, signal ).then( ({ payment } ) => {
                setResponsePayment( { data: payment} )
            }).catch( error => {
                setResponsePayment({ data: { } });
                console.log( 'Ha habido un error');
                console.log( error );
            }) 
        }, 1500); 
        return () => { abortController.abort(); }
    }, [])
    
    return responsePayment;
} 