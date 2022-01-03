import React, { Component, useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import Manifest from './manifest';



const ManifestContext = React.createContext(undefined);

const App = (props) => {

  const [manifest, setManifest] = useState(null);

  useEffect(() => {

    async function initManifest() {

      let manifest = new Manifest();

      //todo: do we need to handle error here?
      await manifest.init();
      setManifest(manifest);
    };

    initManifest();
  }, []);

  return (
    <ManifestContext.Provider value={manifest}>
      <div>
        <h2>Site Headers</h2>
        {!manifest
          ? <div>Loading Manifest...</div>
          : <Outlet />
        }

      </div>
    </ManifestContext.Provider>
  );
};

export default App;
export { ManifestContext };