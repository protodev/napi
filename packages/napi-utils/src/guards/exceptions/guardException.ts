export class GuardException extends Error {
    name: string;
    message: string;
    internalException: Error;
    
    constructor(message?: string, internalException?: Error) {
        super(message || 'a guard assertion failed');
        Object.setPrototypeOf(this, GuardException.prototype);
        this.message = message;
        this.internalException = internalException;
        this.name = this.constructor.name;
    }
}