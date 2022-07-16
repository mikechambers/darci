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

  let clearStorage = query.get("clearstorage") !== null;

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

  const style = {
    padding: "var(--content-padding)",
    borderBottom: "1px solid #FFFFFF66",
  };

  return (
    <GlobalContext.Provider value={{ global, dispatchGlobal }}>
      <React.Fragment>
        {initializingContent ? (
          initializingContent
        ) : (
          <React.Fragment>
            <div id="nav_bar" style={style}>
              <Link to="/">darci</Link>
            </div>
            <div id="current_view">
              <Outlet />
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    </GlobalContext.Provider>
  );
};

export default App;
