import { IHeader } from '@napi/common';
import { RequestContextBuilder } from '@napi/utils';
import { IMiddleware } from "../abstraction/router/iMiddleware";
import { Context } from "koa";
import { Container } from 'inversify';
import { MetaData } from '../abstraction/constants/metaData';

export class RequestContextHandler implements IMiddleware {

    private _container: Container;

    constructor(container: Container) {
        this._container = container;
    }

    middleware = async (context: Context, next: Function): Promise<void> => {
        const headers: IHeader[] = [];

        Object.getOwnPropertyNames(context.request.headers)
            .forEach((key) => {
                headers.push({
                    name: key,
                    value: context.request.headers[key]
                });
            });

        const requestContext = new RequestContextBuilder()
            .setPath(context.request.path)
            .setHeaders(headers)
            .setMethod(context.method)
            .build();

        try {
            /*
             * This is where we find and call the appropriate controller from inversify and handle the request.
             * And create a childContainer so that we can bind request scoped items.
             */
            const controller = this._container.getNamed(requestContext.path, requestContext.method);
            
            const controllerMetadata = Reflect.getOwnMetadata(MetaData.controller, controller);
            const methodMetadata = Reflect.getOwnMetadata(MetaData.route, controller);
            let paramMetadata = Reflect.getOwnMetadata(MetaData.queryParam, controller);
            
            const method = methodMetadata.find((e) => {
                return `${controllerMetadata.path}${e.path}` === requestContext.path
            });

            context.body = await method.target[method.key]();
        } catch (e) {
            console.log(e);
        }
    }
}