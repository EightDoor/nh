import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import "./App.scss"
import SignIn from './views/sign-in';
import LuckyDraw from './views/lucky-draw';
import Home from './views/home';
import InteractiveGames from './views/Interactive-games';

function App() {
  return (
    <Router>
        <ul className="container">
            <div className="container-li-list">
                <li>
                    <Link to="/">首页</Link>
                </li>
                <li>
                    <Link to="/sign-in">签到</Link>
                </li>
                <li>
                    <Link to="/lucky-draw">抽奖</Link>
                </li>
                <li>
                    <Link to="/interactive-games">游戏互动</Link>
                </li>
            </div>
            <img src="/images/pop-up.png" alt=""/>
        </ul>
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route path="/sign-in">
                <SignIn/>
            </Route>
            <Route path="/lucky-draw">
                <LuckyDraw/>
            </Route>
            <Route path="/interactive-games">
                <InteractiveGames/>
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
