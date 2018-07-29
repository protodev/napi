import { GuardException } from "./guardException";

export class GuardEmptyArrayException extends GuardException {
    constructor(message?: string, internalException?: Error) {
        super(message || 'array cannot be null, undefined, or empty', internalException);
        Object.setPrototypeOf(this, GuardEmptyArrayException.prototype);
        this.name = this.constructor.name;
        this.message = message;
    }
}