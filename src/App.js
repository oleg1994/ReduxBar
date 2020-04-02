import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Drinks from "./components/Drinks/Drinks";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Header></Header>
            <Drinks></Drinks>
          </Route>
          <Route path="/cart">
          <Header></Header>
            <Cart />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
