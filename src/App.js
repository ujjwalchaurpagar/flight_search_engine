import React from 'react';
import './App.css';
import './flights.json';
import Header from './Header';
import Sidefilter from './Sidefilter';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidefilter />
    </div>
  );
}

export default App;
