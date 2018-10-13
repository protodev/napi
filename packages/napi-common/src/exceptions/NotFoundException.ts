import { NapiException } from "./NapiException";

export class NotFoundException extends NapiException {
    readonly status: number = 404;
    message: string = 'no matching route handler found'
}