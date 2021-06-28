import { ReactElement, useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { PaymentContext } from '..';

export const Payment = () : ReactElement=> {
    
    let { id }  = useParams<{ id: string }>();
    
    const { useGetPayment } = useContext(PaymentContext);
    const responsePayment = useGetPayment( id );
    console.log( responsePayment );

    return (
        <div>
            <p> Payment { id } </p>
            {/* { data && <p> Payment { JSON.stringify(data) } </p> }  */}
        </div>
    )
}
