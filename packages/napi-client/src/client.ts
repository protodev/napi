import * as PathToRegex from 'path-to-regexp';
import { Container } from 'inversify';
import {
    IController, IRequestContext, ControllerConstants
} from '@protodev/napi-common';

export abstract class Client {
    constructor() {

    }

    performRequest(context: IRequestContext) {        
        
    }
}