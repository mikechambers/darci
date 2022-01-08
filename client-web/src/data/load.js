import {
    ServerResponseError,
    DestinyApiResponseError,
    NetworkError, JSONParsingError
} from "./errors"

export const fetchUrl = async (url, options) => {

    let response;
    try {
        let response = await fetch(url, options);
    } catch (err) {
        throw NetworkError(`Could not fetch url : ${url}`, { cause: err });
    }

    if (!response.ok) {
        throw ServerResponseError(
            `Failed status code [${response.status}] from server url : ${url}`,
            { cause: err }
        );
    }

    //Need to confirm that this cant throw an error
    let out = await response.text();
    return out;
};

export const fetchJson = async (url, options) => {
    let data;
    try {
        data = await fetchData(url, options);
    } catch (err) {
        throw err;
    }

    let out;
    try {
        out = JSON.parse(data);
    } catch (err) {
        throw JSONParsingError(`Error parsing json from url : ${url}`, { cause: err });
    }

    return out;
}

export const fetchDestinyApi = async (url) => {
    let json;

    try {
        //headers
        json = await fetchJson(url);
    } catch (err) {
        throw err;
    }
    /*
        ErrorCode: 7  ​
        ErrorStatus: "ParameterParseFailure"
        Message: "Unable to parse your parameters.  Please correct them, and try again."
    */

    if (json.ErrorCode != 1) {
        throw new DestinyApiResponseError(
            `${json.ErrorStatus} [${json.ErrorCode}] : ${json.Message} : ${url}`
        );
    }

    return json.Response;
}

export const fetchApi = async (url, options) => {
    let json;
    try {
        //headers
        json = await fetchJson(url);
    } catch (err) {
        throw err;
    }
    //todo:move to shared
    if (json.status != "success") {

        let msg;
        let name;

        if (json.error) {
            msg = json.error.message;
            name = json.error.name;
        }

        throw ApiResponseError(`Error calling API. ${name} : ${msg}`);
    }

    return json.response;
}