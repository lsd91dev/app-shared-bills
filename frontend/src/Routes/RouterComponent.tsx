import { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// import { Page404 } from '../Pages/404/Page404';
import payment_constants_route from '../Shared/constants/payment/routes';
import participant_constants_route from '../Shared/constants/participant/routes';
const { HOME, PAYMENT, NEW_PAYMENT } = payment_constants_route;
const { NEW_PARTICIPANT } = participant_constants_route;


const RouterComponent = ()  => {
  return (
  <Suspense fallback={ <div>Loading...</div>}>
  <Router>
    <Switch>
          <Route exact path={ HOME.route } component={ HOME.component } />
          <Route exact path={ NEW_PAYMENT.route } component={ NEW_PAYMENT.component } />
          <Route exact path={ PAYMENT.route } component={ PAYMENT.component } />
          <Route exact path={ NEW_PARTICIPANT.route } component={ NEW_PARTICIPANT.component } />
          <Route exact path="*" ><Redirect to={ HOME.route } /> </Route>       
    </Switch>
</Router>
  </Suspense>
);
}

export default RouterComponent;


