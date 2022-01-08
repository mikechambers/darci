import {
    ApiResponseError,
    ServerResponseError,
    DestinyApiResponseError,
    NetworkError, JSONParsingError
} from "./errors";

import { DESTINY_API_KEY } from "../consts";

import { SERVER_RESPONSE_SUCCESS } from "shared/packages/consts";

export const fetchUrl = async (url, options) => {

    let response;
    try {
        response = await fetch(url, options);
    } catch (err) {
        throw NetworkError(`Could not fetch url : ${url}`, { cause: err });
    }

    if (!response.ok) {
        throw ServerResponseError(
            `Failed status code [${response.status}] from server url : ${url}`
        );
    }

    //Need to confirm that this cant throw an error
    let out = await response.text();
    return out;
};

export const fetchJson = async (url, options) => {
    let data;
    try {
        data = await fetchUrl(url, options);
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


const destinyApiRequestOptions = {
    headers: { 'X-API-Key': `${DESTINY_API_KEY}` }
};

export const fetchDestinyApi = async (url) => {
    let json;

    try {
        json = await fetchJson(url, destinyApiRequestOptions);
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
    if (json.status != SERVER_RESPONSE_SUCCESS) {

        let msg;
        let name;

        if (json.error) {
            msg = json.error.message;
            name = json.error.name;
        }

        throw new ApiResponseError(`Error calling API. ${name} : ${msg}`);
    }

    return json.response;
}