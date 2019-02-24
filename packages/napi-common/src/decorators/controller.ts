import 'reflect-metadata';
import { MetaData } from '../abstraction/constants/metaData';
import { injectable, decorate } from 'inversify';

export function controller(path: string = '', ...middleware) {
    return function (target: any) {
        Reflect.defineMetadata(MetaData.controller, { path, middleware, target }, target);
        decorate(injectable(), target);
    }
}