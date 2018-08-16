import 'reflect-metadata';
import { IMiddleware } from 'koa-router';
import { MetaData } from '../abstraction/constants/metaData';

export function controller(path: string, ...middleware: IMiddleware[]) {
    return function (target: any) {
        Reflect.defineMetadata(MetaData.controller, { path, middleware, target }, target);
    }
}