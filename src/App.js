import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.scss';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { useEffect, useState } from "react";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Page404 from "./Page404";
import Orders from "./Orders";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  const [defaultTitle, setDefaultTitle] = useState('Fake Amazon.com')
  const [{}, dispatch] = useStateValue(null)

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
    <HelmetProvider>
      <Router>
        <div className="app">
          <Switch>
              <Route exact path="/">
                <Helmet>
                  <title>{defaultTitle}</title>
                </Helmet>
                <Header />
                <Home />
              </Route>
              <Route path="/login">
                <Helmet>
                  <title>{`Login | ${defaultTitle}`}</title>
                </Helmet>
                <Login />
              </Route>
              <Route path="/checkout">
                <Helmet>
                  <title>{`Checkout | ${defaultTitle}`}</title>
                </Helmet>
                <Header />
                <Checkout />
              </Route>
              <Route path="/payment">
                <Helmet>
                  <title>{`Payment | ${defaultTitle}`}</title>
                </Helmet>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </Route>
              <Route path="/orders">
                <Helmet>
                  <title>{`Order Hist | ${defaultTitle}`}</title>
                </Helmet>
                <Header />
                <Orders />
              </Route>
              <Route>
                <Helmet>
                  <title>{`404 | ${defaultTitle}`}</title>
                </Helmet>
                <Page404 />
              </Route>
          </Switch>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
