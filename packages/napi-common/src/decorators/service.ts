import { MetaData } from "../abstraction/constants/metaData";
import { injectable, decorate } from "inversify";

export function service() {
    return function (target: any) {
        Reflect.defineMetadata(MetaData.service, { target }, target);
        decorate(injectable(), target);
    }
}