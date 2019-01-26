import { NapiException } from "./NapiException";

export class ForbiddenExecption extends NapiException {
    readonly status: number = 403;
    message: string = 'request is forbidden'
}