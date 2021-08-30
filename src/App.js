import React, {useContext} from 'react';
import './App.css'
import {Context} from "./index";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "./components/Loader";
import {BrowserRouter,Switch,Redirect,Route } from "react-router-dom"
import {TEST_ROUTE, LOGIN_ROUTE} from "./utils/consts";
import {publicRoutes,privateRoutes} from "./routes"

const App = () => {
    

    return (
        <BrowserRouter>
            {true  ?
        (
            <Switch>
                {privateRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact={true}/>
                )}
                <Redirect to={TEST_ROUTE}/>
            </Switch>
        )
        :
        (
            <Switch>
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact={true}/>
                )}
                <Redirect to={LOGIN_ROUTE}/>
            </Switch>
        )}
        </BrowserRouter>
    );
};

export default App;
