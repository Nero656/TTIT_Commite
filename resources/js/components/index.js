import React from "react";
import ReactDOM from 'react-dom';
import Header from './elements/header'
import Reg from "./views/user/registration";
import Auth from "./views/user/Auth";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


export default function Index() {
    return (
        <Router>
            <div>
                <Header/>
                <Switch>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path="/registration">
                        <Registration/>
                    </Route>
                    <Route path="/sign-in">
                        <SingIn/>
                    </Route>

                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    if (localStorage.token === undefined) {
        return <div>Ты не авторизирован</div>
    } else {
        let user = JSON.parse(localStorage.getItem('User'));
        return <div>Привет пользователь {user.username}</div>
    }
}

function About() {
    return <div>About</div>
}

function Registration() {
    return <Reg/>;
}

function SingIn() {
    return <Auth/>;
}

ReactDOM.render(
    ReactDOM.render(<Index/>, document.getElementById('index'))
);

