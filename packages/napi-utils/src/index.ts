import { ILogger } from './abstraction/ILogger';
import { HttpVerb } from './abstraction/http/verbs';
import { guardEmptyArray } from './guards/guardEmptyArray';

const Guards = {
    guardEmptyArray
}

export {
    ILogger,
    HttpVerb,
    Guards,
    guardEmptyArray
}