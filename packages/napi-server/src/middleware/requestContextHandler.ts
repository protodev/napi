import { IHeader, IQueryParam } from '@protodev/napi-common';
import { RequestContextBuilder } from '@protodev/napi-utils';
import { IMiddleware } from '../abstraction/router/iMiddleware';
import { Context } from 'koa';
import { Container } from 'inversify';
import { MetaData } from '../abstraction/constants/metaData';
import { NotFoundException } from '@protodev/napi-common';

export class RequestContextHandler implements IMiddleware {

    private _container: Container;

    constructor(container: Container) {
        this._container = container;
    }

    middleware = async (context: Context, next: Function): Promise<void> => {
        const headers: IHeader[] = [];
        const params: IQueryParam[] = [];
        Object.getOwnPropertyNames(context.request.headers)
            .forEach((key) => {
                headers.push({
                    name: key,
                    value: context.request.headers[key]
                });
            });

        Object.getOwnPropertyNames(context.request.query)
            .forEach(key => {
                params.push({
                    name: key,
                    value: context.request.query[key]
                });
            });

        const requestContext = new RequestContextBuilder()
            .setMethod(context.method)
            .setPath(context.request.path)
            .setHeaders(headers)
            .setQueryParams(params)
            .setBody(context.request.body)
            .build();

        try {
            /*
             * This is where we find and call the appropriate controller from inversify and handle the request.
             * And create a childContainer so that we can bind request scoped items.
             */
            const routeArgs = [];
            const routes = this._container.get<RegExp[]>('Parsed_Routes');
            const matches = routes.filter((route) => {
                return route.exec(requestContext.path);
            });
            
            if(matches.length === 0) {
                throw new NotFoundException();
            }

            const match = matches.pop();
            const controller = this._container.getNamed(match.source, requestContext.method);
            const controllerMetadata = Reflect.getOwnMetadata(MetaData.controller, controller);
            const methodMetadata = Reflect.getOwnMetadata(MetaData.route, controller);

            // NOTE: Concat to create a copy of the metadata for manipulation below.
            const paramMetadata = Array.isArray(Reflect.getOwnMetadata(MetaData.routeParam, controller)) ?
                Reflect.getOwnMetadata(MetaData.routeParam, controller).concat([]) : [];


            const routeHandler = methodMetadata.find((e) => {
                const matched = match.exec(`${controllerMetadata.path ? controllerMetadata.path : ''}${e.path ? e.path : ''}`);
                if (!matched || e.method !== requestContext.method) return false;

                const path = matched.shift();
                const pathParts = path.split('/');
                const pathVariables = match.exec(requestContext.path);
                pathVariables.shift();
                pathVariables.reverse();

                pathParts.forEach(part => {
                    if (part.indexOf(':') !== -1) {
                        requestContext.params.push({
                            name: part.replace(':', ''),
                            value: pathVariables.pop()
                        });
                    }
                });

                requestContext.params.push({ name: 'RequestBody', value: requestContext.body });
                paramMetadata.filter((p) => p.key === e.key).reverse().forEach(paramDecorator => {
                    const paramMatch = requestContext.params.find(param => {
                        return paramDecorator.name === param.name;
                    });

                    paramMatch && paramMatch.value ? routeArgs.push(paramMatch.value) : null;
                });

                return true;
            });

            context.body = await routeHandler.target[routeHandler.key](...routeArgs);
        } catch (e) {
            console.log(e);
        }
    }
}