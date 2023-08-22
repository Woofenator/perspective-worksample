export abstract class BaseException extends Error {
    abstract statusCode: number;
    abstract message: string;
    body: [] | {};

    constructor(body: [] | {}) {
        super();

        this.body = body;
    }
}
