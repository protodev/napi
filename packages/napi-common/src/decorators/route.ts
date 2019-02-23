import { HttpVerb } from '../abstraction/http/verbs';
import { MetaData } from '../abstraction/constants/metaData';

export function get(path: string = '', ...middleware) {
    return this.route(HttpVerb.Get, path, ...middleware);
}

export function post(path: string = '', ...middleware) {
    return this.route(HttpVerb.Post, path, ...middleware);
}

export function put(path: string = '', ...middleware) {
    return this.route(HttpVerb.Put, path, ...middleware);
}

export function patch(path: string = '', ...middleware) {
    return this.route(HttpVerb.Patch, path, ...middleware);
}

export function del(path: string = '', ...middleware) {
    return this.route(HttpVerb.Delete, path, ...middleware);
}

export function options(path: string = '', ...middleware) {
    return this.route(HttpVerb.Options, path, ...middleware);
}

export function route(method: HttpVerb, path?: string, ...middleware) {
    return function (target: any, key: string, value: any) {
        let metaData = { path, middleware, method, target, key };
        let metaDataList = [];
        
        if (!Reflect.hasOwnMetadata(MetaData.route, target.constructor)) {
            Reflect.defineMetadata(MetaData.route, metaDataList, target.constructor);
        } else {
            metaDataList = Reflect.getOwnMetadata(MetaData.route, target.constructor);
        }

        metaDataList.push(metaData);
    }
}