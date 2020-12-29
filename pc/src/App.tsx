import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import "./App.scss"
import SignIn from './views/sign-in';
import LuckyDraw from './views/lucky-draw';

function App() {
  return (
    <Router>
        <ul className="container">
            <li>
                <Link to="/sign-in">签到</Link>
            </li>
            <li>
                <Link to="/lucky-draw">抽奖</Link>
            </li>
        </ul>
        <Switch>
            <Route exact path="/">
                <Redirect to="/sign-in"/>
            </Route>
            <Route path="/sign-in">
                <SignIn/>
            </Route>
            <Route path="/lucky-draw">
                <LuckyDraw/>
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
