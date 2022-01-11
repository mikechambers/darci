class ServerError extends Error {
    static SERVER_RUNTIME_ERROR = "ServerRuntimeError";

    constructor(message, name) {
        super(message);

        this.name = name;
    }
};

module.exports = { ServerError };