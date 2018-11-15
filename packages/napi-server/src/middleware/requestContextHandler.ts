import { IHeader } from '@napi/common';
import { RequestContextBuilder } from '@napi/utils';
import { IMiddleware } from "../abstraction/router/iMiddleware";
import { Context } from "koa";
import { Container } from 'inversify';

export class RequestContextHandler implements IMiddleware {

    private _container: Container;

    constructor(container: Container) {
        this._container = container;
    }

    async middleware(context: Context, next: Function) {
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
            .build();

        try {
            /*
             * TODO: This is where we find and call the appropriate controller from
             * inversify and handle the request.
             */
            await next(requestContext);
        } catch (e) {
            console.log(e);
        }
    }
}