import { useEffect } from "react";

const calculateKillsDeathsRatio = function (kills, deaths) {
    return (deaths !== 0) ? kills / deaths : kills;
}

const calculateKillsDeathsAssists = function (kills, deaths, assists) {
    let t = kills + (assists / 2);
    return (deaths !== 0) ? t / deaths : t;
}

const calculateEfficiency = function (kills, deaths, assists) {
    return (deaths !== 0) ? (kills + assists) / deaths : 0;
}

export function useInterval(callback, interval) {

    useEffect(() => {
        if (!interval) {
            return;
        }

        const intervalId = setInterval(() => {
            console.log("interval tick");
            callback();
        }, interval);

        return () => {
            console.log("clear interval");
            clearInterval(intervalId);
        };
    });
}

export {
    calculateEfficiency,
    calculateKillsDeathsRatio,
    calculateKillsDeathsAssists
};