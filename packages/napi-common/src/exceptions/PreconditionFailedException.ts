import { NapiException } from "./NapiException";

export class PreconditionFailedException extends NapiException {
    readonly status: number = 412;
    message: string = 'precondition failed'
}