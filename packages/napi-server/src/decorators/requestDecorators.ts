import { MetaData } from "../abstraction/constants/metaData";

export function queryParam(name: string) {
    return function (target: any, key: string, value: any, index: number) {
        let metaData = { name, target, key };
        let metaDataList = [];

        if (!Reflect.hasOwnMetadata(MetaData.queryParam, target.constructor)) {
            Reflect.defineMetadata(MetaData.queryParam, metaDataList, target.constructor);
        } else {
            metaDataList = Reflect.getOwnMetadata(MetaData.queryParam, target.constructor);
        }

        metaDataList.push(metaData);
    }
}