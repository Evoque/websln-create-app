import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'superagent';

class App extends Component {

  componentWillMount() {  
    $.get('https://api.github.com/repos/facebook/react/commits')
      .end((error, response) => {
        if (!error && response) {
          console.log('Nice! ==> ');
          console.dir(response.body);
        } else {
          console.log('There are errors fetching from Github:', error);
        }
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <h1>Yeah Evoque!</h1>
        </p>
      </div>
    );
  }
}

export default App;
