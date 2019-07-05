import React from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux';
import store from './redux/redux';
import './App.css';
import TwitterApp from './components/TwitterApp';

function App() {
 
  return (

    <div className="App">
      <Provider store={store}>
      <TwitterApp></TwitterApp>
      </Provider>
    </div>
  );
};


export default App;
