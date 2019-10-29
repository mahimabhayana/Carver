import React, { Component } from 'react';
// import Button from 'antd/es/button';
import './App.css';
import Home from './containers/Home';
import Results from './containers/Results';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends Component {
  
  render() {

    return (
      <div className="App">
       <Router>
         <Switch>
          <Route path="/results" component={Results} />
          <Route path="/">
            <Home />
          </Route>
          </Switch>
       </Router>
      </div>
    );
  }
}

export default App;