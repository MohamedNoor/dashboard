import React, { Component } from 'react';
import Header from './component/Header.js';
import TopPCT from './component/Top%.js';
import Top from './component/Top.js';
import Weekly from './component/Weekly.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
          <Header />
          <TopPCT />
          <Top />
          <Weekly />
      </div>
    );
  }
}

export default App;
