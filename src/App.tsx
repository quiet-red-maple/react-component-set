import React from 'react';
import Layout from './Layout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';

const App = () => (
  <Provider store={store}>
  <Router>
    <Switch>
      <Route path="/" component={Layout} />
    </Switch>
  </Router>
  </Provider>
);

export default App;
