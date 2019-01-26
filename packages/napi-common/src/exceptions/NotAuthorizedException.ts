import { NapiException } from "./NapiException";

export class NotAuthorizedException extends NapiException {
    readonly status: number = 401;
    message: string = 'request is not authorized'
}