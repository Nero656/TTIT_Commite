import React from "react";
import ReactDOM from "react-dom";
import Header from "./elements/header";
import Footer from "./elements/footer";
import Home from "./views/home";
import Auth from "./views/user/Auth";
import ProfL from "./views/profList";
import UserPage from "./views/user/UserPage";
import SendRequest from "./views/sendRequest"
import Category from "./views/category";
import Registration from "./views/user/registration";
import AdminPanel from "./views/admin-penel/index"
import Applications from "./views/applications"
import {Provider} from 'react-redux';
import store from '../app/store';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


export default function Index() {
    return (
        <Router>
            <Provider store={store}>
                    <div className={'wrapper mb-5'}>
                        <Header/>
                        <div className={'content'}>
                            <Switch>
                                <Route path="/prof-list">
                                    <ProfL/>
                                </Route>
                                <Route path="/user-page">
                                    <UserPage/>
                                </Route>
                                <Route path="/registration">
                                    <Registration/>
                                </Route>
                                <Route path="/sign-in">
                                    <Auth/>
                                </Route>
                                <Route path="/category">
                                    <Category/>
                                </Route>
                                <Route path="/send-request">
                                    <SendRequest/>
                                </Route>
                                <Route path="/admin-panel">
                                    <AdminPanel/>
                                </Route>
                                <Route path="/applications">
                                    <Applications/>
                                </Route>
                                <Route path="/">
                                    <Home/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                    <Footer/>
            </Provider>
        </Router>
    );
}


ReactDOM.render(
    ReactDOM.render(<Index/>, document.getElementById('index'))
);

