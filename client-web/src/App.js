import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useFetchManifest } from "./hooks/remote";
import { useParams } from "react-router-dom";
import { CharacterClassSelection, Mode, Moment } from "shared";

import {
  GlobalContext,
  useGlobalContext,
  GlobalAction,
} from "./contexts/GlobalContext";
import SidebarView from "./components/SidebarView";
const { useQuery } = require("./hooks/browser");

const App = (props) => {
  let query = useQuery();

  let params = useParams();

  let mode = params.mode ? Mode.fromString(params.mode) : undefined;
  let moment = params.moment ? Moment.fromString(params.moment) : undefined;
  let classSelection = params.classType
    ? CharacterClassSelection.fromString(params.classType)
    : undefined;

  let [player, setPlayer] = useState();

  //console.log(params.memberId);
  useEffect(() => {
    let p;

    if (params.memberId) {
      p = {
        memberId: params.memberId,
      };
      setPlayer(p);
    }
  }, [params.memberId]);

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

  let initializingContent;
  if (error) {
    initializingContent = <div>Error loading manifest</div>;
  } else if (isLoading) {
    initializingContent = <div>Initializing Manifest</div>;
  }

  const style = {
    display: "flex",
  };

  const currentViewStyle = {
    flexGrow: "2",
    height: "100vh",
    //maxWidth: 900,
  };

  return (
    <GlobalContext.Provider value={{ global, dispatchGlobal }}>
      <React.Fragment>
        {initializingContent ? (
          initializingContent
        ) : (
          <div style={style}>
            <SidebarView />

            <div style={currentViewStyle}>
              <Outlet />
            </div>
          </div>
        )}
      </React.Fragment>
    </GlobalContext.Provider>
  );
};

export default App;
