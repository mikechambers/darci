/* MIT License
 *
 * Copyright (c) 2023 Mike Chambers
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

export class NetworkError extends Error {
    name = "NetworkError";
}
export class ApiResponseError extends Error {
    name = "ApiResponseError";
}

export class JSONParsingError extends Error {
    name = "JSONParsingError";

    constructor(message, url, cause) {
        super(message, cause);
        this.url = url;
    }
}
export class ActivityNotFoundError extends Error {
    name = "ActivityNotFoundError";
}

//note, we are not using this right now
export class ServerResponseError extends Error {
    status;
    url;

    name = "ServerResponseError";

    constructor(message, status, url) {
        super(message);
        this.status = status;
        this.url = url;
    }
}

export class DestinyApiResponseError extends Error {
    code;
    status;
    message;
    url;

    name = "DestinyApiResponseError";

    constructor(message, status, code, url) {
        super(message);
        this.code = code;
        this.status = status;
        this.url = url;
    }
}

export class DestinyApiDisabledError extends DestinyApiResponseError {}
