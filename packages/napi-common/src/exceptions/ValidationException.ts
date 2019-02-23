import { BadRequestException } from './BadRequestException';

export class ValidationException extends BadRequestException {
    fieldErrors;
    
    constructor(message, fieldErrors) {
        super();
        this.message = message;
        this.fieldErrors = fieldErrors;
    }
}