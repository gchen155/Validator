import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Upload from "./components/Upload";
import About from "./components/About";

export default function Routes() {
  return (
    <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route exact path="/notfound">
            <NotFound />
        </Route>
        <Route exact path="/login">
            <Login />
        </Route>
        <Route exact path="/upload">
            <Upload />
        </Route>
        <Route exact path="/about">
            <About />
        </Route>
    </Switch>
  );
}