import React, { Component, useState, useEffect, useReducer } from 'react';
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFetchManifest } from './hooks/remote';

import { GlobalContext, useGlobalContext, GlobalAction } from './contexts/GlobalContext';


const App = (props) => {
  const [global, dispatchGlobal] = useGlobalContext();
  const manifest = global.manifest;

  const [m, isLoading, error] = useFetchManifest();

  if (m && !manifest) {
    dispatchGlobal(new GlobalAction(GlobalAction.MANIFEST_UPDATED, m));
  }

  console.log("----------App-----------");

  let initializingContent;
  if (error) {
    initializingContent = <div>Error loading manifest</div>;
  } else if (isLoading) {
    initializingContent = <div>Initializing Manifest</div>;
  }

  return (
    <GlobalContext.Provider value={{ global, dispatchGlobal }}>
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
    </GlobalContext.Provider>
  );
};

export default App;
