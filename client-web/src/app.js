import React, { Component } from 'react';
import { Outlet } from "react-router-dom";


class App extends React.Component {

  render() {
    return (
      <div>
        <h2>Site Headers</h2>
        <Outlet />
      </div>
    );
  }
}

export default App;