export default class CancelRequestError extends Error {

    constructor(message?: string) {
        super(message);
        this.name = "CancelRequest";
    }

}
