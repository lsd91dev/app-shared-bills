import { PaymentInterface } from '../../Interfaces/payment.interface';
const { REACT_APP_URL } = process.env;


export const newPayment = async ( payment  : PaymentInterface ) => {
        const response = await fetch(`${ REACT_APP_URL }/payment/new`, getRequestOptions('POST', payment ) );
        return response.json();
}


const getRequestOptions = (method: string, payload: any): {} => {
    return {
        method,
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify( payload )
    }
}