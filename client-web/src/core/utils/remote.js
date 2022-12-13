/* MIT License
 *
 * Copyright (c) 2022 Mike Chambers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {
    ApiResponseError,
    ServerResponseError,
    DestinyApiResponseError,
    NetworkError,
    JSONParsingError,
    DestinyApiDisabledError,
} from "../errors";

import { DESTINY_API_KEY } from "../consts";

import { SERVER_RESPONSE_SUCCESS } from "shared/packages/consts";

export const fetchUrl = async (url, options) => {
    let response;
    try {
        response = await fetch(url, options);
    } catch (err) {
        throw new NetworkError(`Could not fetch url : ${url}`, { cause: err });
    }

    return response;
};

export const fetchJson = async (url, options) => {
    let response;
    try {
        response = await fetchUrl(url, options);
    } catch (err) {
        throw err;
    }

    let body = await response.text();
    let out;
    try {
        out = JSON.parse(body);
    } catch (err) {
        if (!response.ok) {
            throw new ServerResponseError(body, response.status, url);
        } else {
            throw new JSONParsingError("Error parsing json", url, {
                cause: err,
            });
        }
    }

    return out;
};

const destinyApiRequestOptions = {
    headers: { "X-API-Key": `${DESTINY_API_KEY}` },
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

    if (json.ErrorCode !== 1) {
        const code = json.ErrorCode;
        const message = json.Message;
        const status = json.ErrorStatus;

        let type;
        switch (code) {
            case 5: {
                type = DestinyApiDisabledError;
                break;
            }
            default: {
                type = DestinyApiResponseError;
            }
        }

        throw new type(message, status, code, url);
    }

    return json.Response;
};

export const fetchApi = async (url, options) => {
    let json;
    try {
        //headers
        json = await fetchJson(url);
    } catch (err) {
        throw err;
    }

    //todo:move to shared
    if (json.status !== SERVER_RESPONSE_SUCCESS) {
        let msg;
        let name;

        if (json.error) {
            msg = json.error.message;
            name = json.error.name;
        }

        throw new ApiResponseError(`Error calling API. ${name} : ${msg}`);
    }

    return json.response;
};
