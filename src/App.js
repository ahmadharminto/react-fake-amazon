import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.scss';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";

function App() {
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
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/checkout">
              <Header />
              <Checkout />
            </Route>
            <Route path="/payment">
              <Header />
            </Route>
            <Route path="/">
              <Header />
              <Home />
            </Route>
         </Switch>
      </div>
    </Router>
  );
}

export default App;
