import React, { Component, useState, useEffect, useReducer } from 'react';
import { Outlet } from "react-router-dom";
import Manifest from './manifest';
import reducer, { initialState } from "./app_state/reducer";
import { Link } from "react-router-dom";
import Action, { MANIFEST_UPDATED } from './app_state/action';

export const AppContext = React.createContext();

const App = (props) => {
  const [global, dispatchGlobal] = useReducer(reducer, initialState);
  const manifest = global.manifest;

  useEffect(() => {

    async function initManifest() {

      let manifest = new Manifest();

      //todo: do we need to handle error here?
      await manifest.init();

      dispatchGlobal(new Action(MANIFEST_UPDATED, manifest));
    };

    initManifest();
  }, []);

  return (
    <AppContext.Provider value={{ global, dispatchGlobal }}>
      <div>
        <h2>Site Headers</h2>
        <div>
          <Link to='/'>main</Link>
        </div>
        {!manifest
          ? <div>Loading Manifest...</div>
          : <Outlet />
        }

      </div>
    </AppContext.Provider>
  );
};

export default App;
