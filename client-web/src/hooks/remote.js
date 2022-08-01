import { GlobalContext } from "../contexts/GlobalContext";
import PlayerSummary from "../data/PlayerSummary";
import PlayerProfile from "../data/PlayerProfile";
import Activity from "../data/Activity";

import { useState, useContext, useEffect } from "react";
import Manifest from "../data/Manifest";

import { MANIFEST_CHECK_INTERVAL } from "../consts";
import { fetchApi, fetchDestinyApi } from "../utils/remote";

import Player from "../data/Player";
import PlayerActivities from "../data/PlayerActivities";

const STORAGE_MANIFEST_DATA_KEY = "STORAGE_MANIFEST_DATA_KEY";
const STORAGE_MANIFEST_LAST_CHECK_KEY = "STORAGE_MANIFEST_LAST_CHECK_KEY";
export const useFetchManifest = () => {
  const [output, setOutput] = useState({
    manifest: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const storage = window.localStorage;

    let lastCheckTimeStamp = storage.getItem(STORAGE_MANIFEST_LAST_CHECK_KEY);

    let now = new Date().getTime();

    //if we checked (without an error) within the last N amount of time
    //then abort check

    if (output.manifest && lastCheckTimeStamp) {
      if (now - lastCheckTimeStamp < MANIFEST_CHECK_INTERVAL) {
        return;
      }
    }

    let rawStoredData = storage.getItem(STORAGE_MANIFEST_DATA_KEY);
    let storedData;

    let version = "check";
    if (rawStoredData) {
      try {
        storedData = JSON.parse(rawStoredData);

        version = btoa(storedData.version);
      } catch (err) {
        let e = new Error("Error parsing locally stored manifest JSON.", {
          cause: err,
        });
        let s = reducer(output, "error", e);
        s = reducer(s, "isLoading", false);
        setOutput(s);
        return;
      }
    }

    const f = async () => {
      let s = reducer(output, "isLoading", false);
      let data;
      let error;
      try {
        data = await fetchApi(`/manifest/${version}/`);
      } catch (err) {
        error = new Error("Error fetching manifest data from server.", {
          cause: err,
        });
      }

      let manifest;
      if (error) {
        //if error occured and we have stored data, then use the stored data
        if (storedData) {
          manifest = new Manifest(storedData);
          console.log(
            "Error loading manifest data. Used stored manifest",
            error
          );
          error = null;
        }
      } else {
        if (data.updated) {
          storage.setItem(STORAGE_MANIFEST_DATA_KEY, JSON.stringify(data));
          manifest = new Manifest(data);
        } else {
          manifest = new Manifest(storedData);
        }

        storage.setItem(STORAGE_MANIFEST_LAST_CHECK_KEY, now);
      }

      s = reducer(s, "manifest", manifest);
      s = reducer(s, "error", error);

      setOutput(s);
    };

    f();
  }, []);

  return [output.manifest, output.isLoading, output.error];
};

export const useFetchActivity = (activityId) => {
  const [output, setOutput] = useState({
    activity: undefined,
    isLoading: true,
    error: undefined,
  });

  const { global, dispatchGlobal } = useContext(GlobalContext);
  const manifest = global.manifest;

  useEffect(() => {
    if (!manifest) {
      return;
    }

    const f = async () => {
      let s = reducer(output, "isLoading", false);
      try {
        const data = await fetchApi(`/api/activity/${activityId}/`);
        const a = new Activity(data, manifest);
        s = reducer(s, "activity", a);
      } catch (err) {
        s = reducer(s, "error", err);
      }

      setOutput(s);
    };

    f();
  }, [activityId]);

  return [output.activity, output.isLoading, output.error];
};

export const useFetchPlayerActivities = (
  refreshInterval,
  memberId,
  mode,
  moment,
  classSelection,
  hash = undefined
) => {
  const [output, setOutput] = useState({
    playerActivities: undefined,
    isLoading: true,
    error: undefined,
  });

  const { global, dispatchGlobal } = useContext(GlobalContext);
  const manifest = global.manifest;

  useEffect(() => {
    if (!manifest || !memberId || !mode || !moment || !classSelection) {
      return;
    }

    let timeoutId;
    const f = async () => {
      let s = reducer(output, "isLoading", false);
      try {
        const data = await fetchApi(
          `/api/player/activities/${memberId}/${classSelection.toString()}/${mode.toString()}/${moment.toString()}/`
        );

        const as = PlayerActivities.fromApi(data, manifest);
        s = reducer(s, "activityStats", as);
      } catch (err) {
        s = reducer(s, "error", err);
      }

      setOutput(s);

      timeoutId = startTimeout(f, refreshInterval);
    };

    f();

    return () => {
      cleanUpTimeout(timeoutId);
    };
  }, [classSelection, manifest, memberId, mode, moment, refreshInterval, hash]);

  return [output.activityStats, output.isLoading, output.error];
};

export const useFetchPlayerSummary = (
  refreshInterval,
  memberId,
  mode,
  moment,
  classSelection,
  hash = undefined
) => {
  const [output, setOutput] = useState({
    activityStats: undefined,
    isLoading: true,
    error: undefined,
  });

  const { global, dispatchGlobal } = useContext(GlobalContext);
  const manifest = global.manifest;

  useEffect(() => {
    if (!manifest || !memberId || !mode || !moment || !classSelection) {
      return;
    }

    let timeoutId;
    const f = async () => {
      let s = reducer(output, "isLoading", false);
      try {
        const data = await fetchApi(
          `/api/player/${memberId}/${classSelection.toString()}/${mode.toString()}/${moment.toString()}/`
        );

        const as = PlayerSummary.fromApi(data, manifest);
        s = reducer(s, "activityStats", as);
      } catch (err) {
        s = reducer(s, "error", err);
      }

      setOutput(s);

      timeoutId = startTimeout(f, refreshInterval);
    };

    f();

    return () => {
      cleanUpTimeout(timeoutId);
    };
  }, [classSelection, manifest, memberId, mode, moment, refreshInterval, hash]);

  return [output.activityStats, output.isLoading, output.error];
};

export const useFetchPlayers = () => {
  const { global, dispatchGlobal } = useContext(GlobalContext);
  const manifest = global.manifest;

  //return is [players, isLoading, error]
  const [output, setOutput] = useState({
    players: [],
    error: undefined,
    isLoading: true,
  });

  useEffect(() => {
    async function f() {
      let s = reducer(output, "isLoading", false);
      try {
        const data = await fetchApi("/api/players/");

        let players = [];
        for (const p of data.players) {
          players.push(Player.fromApi(p, manifest));
        }

        s = reducer(s, "players", players);
      } catch (err) {
        s = reducer(s, "error", err);
      }

      setOutput(s);
    }

    f();
  }, []);

  return [output.players, output.isLoading, output.error];
};

export const useFetchPlayerProfile = (
  refreshInterval,
  memberId,
  platformId
) => {
  const [output, setOutput] = useState({
    profile: null,
    isLoading: true,
    error: null,
  });

  const { global, dispatchGlobal } = useContext(GlobalContext);
  const manifest = global.manifest;

  useEffect(() => {
    const f = async () => {
      let s = reducer(output, "isLoading", false);
      try {
        const data = await fetchDestinyApi(
          `https://www.bungie.net/Platform/Destiny2/${platformId}/Profile/${memberId}/?components=100,200,202`
        );

        let profile = new PlayerProfile(data, manifest);
        s = reducer(s, "profile", profile);
      } catch (err) {
        console.log("err", err);
        s = reducer(s, "error", err);
      }

      setOutput(s);
      timeoutId = startTimeout(f, refreshInterval);
    };

    f();

    let timeoutId;
    return () => {
      cleanUpTimeout(timeoutId);
    };
  }, []);

  return [output.profile, output.isLoading, output.error];
};

//note, we wrap these to make it easier to log, debug in a single place
//and also remove some boiler plate code on whether they should run (refresh)
const startTimeout = (f, interval) => {
  if (!interval) {
    return;
  }

  const id = setTimeout(f, interval);
  return id;
};

const cleanUpTimeout = (id) => {
  if (id) {
    clearTimeout(id);
  }
};

const reducer = (initial, type, payload) => {
  let out = { ...initial };
  out[type] = payload;
  return out;
};
