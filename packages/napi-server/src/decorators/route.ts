import { MetaData } from '../abstraction/constants/metaData';
import { IMiddleware } from 'koa-router';

export function route(method: string, path: string, ...middleware: IMiddleware[]) {
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