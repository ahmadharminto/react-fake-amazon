import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.scss';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Page404 from "./Page404";
import Orders from "./Orders";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  document.title = 'Fake Amazon.com'

  const [{}, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [dispatch])

  return (
    <Router>
       <div className="app">
         <Switch>
            <Route exact path="/">
              <Header />
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/checkout">
              <Header />
              <Checkout />
            </Route>
            <Route path="/payment">
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </Route>
            <Route path="/orders">
              <Header />
              <Orders />
            </Route>
            <Route>
              <Page404 />
            </Route>
         </Switch>
      </div>
    </Router>
  );
}

export default App;
