import React, { Component, useState, useEffect, useReducer } from 'react';
import { Outlet } from "react-router-dom";
import Manifest from './manifest';
import reducer, { initialState } from "./app_state/reducer";
import { Link } from "react-router-dom";
import Action, { MANIFEST_UPDATED } from './app_state/action';
import { useFetchManifest } from './data/fetch_hooks';

export const AppContext = React.createContext();

const App = (props) => {
  const [global, dispatchGlobal] = useReducer(reducer, initialState);

  const manifest = global.manifest;
  const m = useFetchManifest();

  useEffect(() => {
    if (m) {
      setTimeout(
        () => {
          dispatchGlobal(new Action(MANIFEST_UPDATED, m));
        }, 10); //we add 1 second so we dont get a quick flash of items switching

    }
  }, [m]);

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
