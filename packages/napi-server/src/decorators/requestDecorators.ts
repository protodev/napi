import { MetaData } from "../abstraction/constants/metaData";

export enum RequestDecoratorTypes {
    PathVariable = 'PathVariable',
    QueryParam = 'QueryParam'
}

export function queryParam(name: string) {
    return requestVariable(name, RequestDecoratorTypes.QueryParam);
}

export function pathVariable(name: string) {
    return requestVariable(name, RequestDecoratorTypes.PathVariable);
}

export function requestVariable(name: string, type: RequestDecoratorTypes) {
    return function (target: any, key: string, value: any, index: number) {
        let metaData = { name, target, key, type };
        let metaDataList = [];

        if (!Reflect.hasOwnMetadata(MetaData.routeParam, target.constructor)) {
            Reflect.defineMetadata(MetaData.routeParam, metaDataList, target.constructor);
        } else {
            metaDataList = Reflect.getOwnMetadata(MetaData.routeParam, target.constructor);
        }

        metaDataList.push(metaData);
    }
}