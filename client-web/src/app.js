import React, { Component } from 'react';
import { Outlet } from "react-router-dom";

const App = (props) => {
  return (
    <div>
      <h2>Site Headers</h2>
      <Outlet />
    </div>
  );
};

export default App;