import React, {useContext} from 'react';
import {Route, Redirect, Routes} from 'react-router-dom'
import {BrowserRouter} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import PageNotFound from "../pages/PageNotFound";
import {Context} from "../index";
const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
        {user.isAuth && authRoutes.map(({path, Component}) =>
            <Route key={path} path={path} Component={Component} exact/>)}
        {publicRoutes.map(({path, Component}) =>
            <Route key={path} path={path} Component={Component} exact/>)}
        </Routes>
    );
};

export default AppRouter;
