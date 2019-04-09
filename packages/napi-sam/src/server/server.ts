import { Container } from 'inversify';
import { Logger } from '@protodev/napi-common'
import * as ApiBuilder from 'claudia-api-builder';

export class Server {
    private _container: Container;

    constructor(container: Container) {
        this._container = container;
    }

    init() {

    }

    private registerControllers() {

    }
}