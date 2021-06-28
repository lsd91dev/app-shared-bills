import React, { useState } from 'react'
import { ResponsePaymentListInterface } from '../../Interfaces/response.payment.interface';

const ResponsePaymentListContextType = {
    response : { 
        payments: [],
        participants: [],
        total_balance: [],
        debtors: []
    },
    setResponse: (response: ResponsePaymentListInterface ) => { }
}

const ResponsePaymentListContext = React.createContext(ResponsePaymentListContextType)

const ResponsePaymentListContextProvider = ({ children } : any) => { 

    const [ response , setResponse ] = useState(ResponsePaymentListContextType.response);    
    
    return ( <ResponsePaymentListContext.Provider value={ { response, setResponse } }>
                { children }
            </ResponsePaymentListContext.Provider>
        )
  }
  
  export { ResponsePaymentListContextProvider, ResponsePaymentListContext } 