export class NapiException extends Error {
    readonly status: number = 500;
    message: string = 'an unknown error occurred';
}