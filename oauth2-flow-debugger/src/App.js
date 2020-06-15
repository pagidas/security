import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"
import OAuth2Tester from "./OAuth2TesterEngine"
import AuthCallback from "./components/AuthCallback/component"

export const App = () => (
  <div className="App">
    <Router>
      <Switch>
        <Route exact path="/">
          <OAuth2Tester />
        </Route>
        <Route path="/auth/callback">
          <AuthCallback />
        </Route>
      </Switch>
    </Router>
  </div>
)
