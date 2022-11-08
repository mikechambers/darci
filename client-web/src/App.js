import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useFetchManifest, useFetchPlayers } from "./hooks/remote";

import {
  GlobalContext,
  useGlobalContext,
  GlobalAction,
  MANIFEST_UPDATED,
  PLAYERS_UPDATED,
} from "./contexts/GlobalContext";
import MainNavView from "./components/MainNavView";
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
  const players = global.players;

  const [loadedPlayers, isPlayersLoading, isPlayersError] =
    useFetchPlayers(manifest);
  const [m, isLoading, error] = useFetchManifest();

  if (m && !manifest) {
    dispatchGlobal(new GlobalAction(MANIFEST_UPDATED, m));
  }

  if (loadedPlayers && !players) {
    dispatchGlobal(new GlobalAction(PLAYERS_UPDATED, loadedPlayers));
  }

  let initializingContent;
  if (error) {
    initializingContent = <div>Error loading manifest</div>;
  } else if (isLoading) {
    initializingContent = <div>Initializing Manifest</div>;
  }

  const style = {
    display: "flex",
    flexDirection: "column",
    width: "var(--page-max-width)",
  };

  const currentViewStyle = {
    flexGrow: "2",
    //height: "100vh",
  };

  return (
    <GlobalContext.Provider value={{ global, dispatchGlobal }}>
      <React.Fragment>
        {initializingContent ? (
          initializingContent
        ) : (
          <div style={style}>
            <MainNavView />

            <div style={currentViewStyle}>
              <Outlet />
            </div>
            <div>&nbsp;</div>
          </div>
        )}
      </React.Fragment>
    </GlobalContext.Provider>
  );
};

export default App;
