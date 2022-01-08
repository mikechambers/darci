import React, { Component, useState, useEffect, useReducer } from 'react';
import { Outlet } from "react-router-dom";
import Manifest from './manifest';
import reducer, { initialState } from "./app_state/reducer";
import { Link } from "react-router-dom";
import Action, { MANIFEST_UPDATED } from './app_state/action';
import { useFetchManifest } from './data/hooks';

export const AppContext = React.createContext();

const App = (props) => {
  const [global, dispatchGlobal] = useReducer(reducer, initialState);
  const manifest = global.manifest;

  const [m, isLoading, error] = useFetchManifest();

  if (m && !manifest) {
    dispatchGlobal(new Action(MANIFEST_UPDATED, m));
  }

  console.log("----------App-----------");

  let initializingContent;
  if (error) {
    initializingContent = "<div>Error loading manifest</div>";
  } else if (isLoading) {
    initializingContent = "<div>Initializing Manifest</div>";
  }

  return (
    <AppContext.Provider value={{ global, dispatchGlobal }}>
      <div>
        {initializingContent
          ? initializingContent
          : (
            <div>
              <h2>Site Headers</h2>
              <div>
                <Link to='/'>main</Link>
              </div>
              <Outlet /></div>
          )
        }

      </div>
    </AppContext.Provider>
  );
};

export default App;
