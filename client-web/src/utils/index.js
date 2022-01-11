
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