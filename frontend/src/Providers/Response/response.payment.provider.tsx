import React, { useState } from 'react'
import { ResponsePaymentInterface } from '../../Interfaces/response.payment.interface';

const ResponsePaymentContextType = {
    responsePayment: { data: {} },
    setResponsePayment: ( responsePayment: ResponsePaymentInterface ) => { }
}

const ResponsePaymentContext = React.createContext(ResponsePaymentContextType)

const ResponsePaymentContextProvider = ({ children } : any) => { 

    const [ responsePayment, setResponsePayment ] = useState( ResponsePaymentContextType.responsePayment);
    
    
    return ( <ResponsePaymentContext.Provider value={ { responsePayment, setResponsePayment } }>
                { children }
            </ResponsePaymentContext.Provider>
        )
  }
  
  export { ResponsePaymentContextProvider, ResponsePaymentContext } 