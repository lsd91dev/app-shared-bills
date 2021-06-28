import React from 'react'
import  { useListPayments, useGetPayment } from '../../Hooks';


const PaymentContext = React.createContext({ useListPayments, useGetPayment });

const PaymentContextProvider = ({ children } : any) => {

    return ( <PaymentContext.Provider value={ { useListPayments, useGetPayment } }>
                { children }
            </PaymentContext.Provider>
        )
  }
  
  export { PaymentContextProvider, PaymentContext } 