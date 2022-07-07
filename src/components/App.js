import React, { Component } from 'react';
import { Routes ,Route, BrowserRouter  } from 'react-router-dom';
import Main from './main';
class App extends Component {
  render() {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
      
    );
  }
}

export default App;