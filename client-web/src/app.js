import React, { Component, useState, useEffect, useReducer } from 'react';
import { Outlet } from "react-router-dom";
import Manifest from './manifest';
import reducer from "./app_state/reducer";
import initialState from './app_state/initial_state';
import Action, { MANIFEST_UPDATED } from './app_state/action';

export const AppContext = React.createContext();

const App = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const manifest = state.manifest;

  useEffect(() => {

    async function initManifest() {

      let manifest = new Manifest();

      //todo: do we need to handle error here?
      await manifest.init();

      dispatch(new Action(MANIFEST_UPDATED, manifest));
    };

    initManifest();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div>
        <h2>Site Headers</h2>
        {!manifest
          ? <div>Loading Manifest...</div>
          : <Outlet />
        }

      </div>
    </AppContext.Provider>
  );
};

export default App;
