import React, { Component, useState, useEffect, useReducer } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFetchManifest } from "./hooks/remote";

import {
  GlobalContext,
  useGlobalContext,
  GlobalAction,
} from "./contexts/GlobalContext";
const { useQuery } = require("./hooks/browser");

const App = (props) => {
  let query = useQuery();

  let clearStorage = query.get("clearstorage") !== undefined;
  useEffect(() => {
    if (clearStorage === true) {
      console.log("Clearing local storage.");
      window.localStorage.clear();
    }
  }, [clearStorage]);

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
        {initializingContent ? (
          initializingContent
        ) : (
          <div>
            <div>
              <Link to="/">&lt;main</Link>
            </div>
            <Outlet />
          </div>
        )}
      </div>
    </GlobalContext.Provider>
  );
};

export default App;
