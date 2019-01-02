import { MetaData } from "../abstraction/constants/metaData";

export function middleware() {
    return function middleware(target: any) {
        Reflect.defineMetadata(MetaData.middleware, {}, target);
    }
}