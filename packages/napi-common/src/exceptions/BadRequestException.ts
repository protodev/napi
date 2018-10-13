import { NapiException } from "./NapiException";

export class BadRequestException extends NapiException {
    readonly status: number = 400;
    message: string = 'there is one or more problems with your request';
}