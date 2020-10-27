export default class TimeoutRequestError extends Error {

    constructor(message?: string) {
        super(message);
        this.name = "TimeoutRequest";
    }

}
