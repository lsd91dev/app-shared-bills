import './App.css';
import RouterComponent from './Routes/RouterComponent';

import  { PaymentContextProvider } from './Providers/Payments/payments.provider';
import  { ResponsePaymentListContextProvider } from './Providers/Response/response.payment.list.provider';

const App = ()  => {

  return (

    <PaymentContextProvider>
      < ResponsePaymentListContextProvider>
      <RouterComponent />
      </ ResponsePaymentListContextProvider>
    </PaymentContextProvider>
  
);
}

export default App;
