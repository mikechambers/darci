import { useEffect } from "react";


export const calculateAverage = (value, total) => {
    if (!total) {
        return 0;
    }

    return value / total;
}

export const calculatePercent = (value, total) => {
    if (!total) {
        return 0;
    }

    return (value / total) * 100.0;
}

export const useInterval = (callback, interval) => {

    useEffect(() => {
        if (!interval) {
            return;
        }

        const intervalId = setInterval(() => {
            callback();
        }, interval);

        return () => {
            clearInterval(intervalId);
        };
    });
}
