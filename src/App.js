import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import Login from "./containers/Login";
import Register from "./containers/Register";
import Dashboard from "./containers/Dashboard";

class App extends Component {
  render() {
    const isLoggedIn = store.getState().session.isLoggedIn;
    return (
      <Provider store={store}>
        <BrowserRouter>
        { !isLoggedIn ?
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route exact path="/" render={(props) => {
                return <Redirect to="/login" />
              }} />
            </Switch>
          :
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route exact path="/" render={(props) => {
              return <Redirect to="/" />
            }} />
          </Switch>
        }
          <ToastContainer autoClose={4000} draggable={false} />

        </BrowserRouter>
      </Provider>  
    );
  }
}

export default App;
