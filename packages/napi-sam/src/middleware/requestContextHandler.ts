import { IHeader, IQueryParam, RequestSymbols, NotFoundException, MetaData } from "@protodev/napi-common";
import { RequestContextBuilder } from '@protodev/napi-utils';
import { Container } from "inversify";
import { claudiaPathToNapi } from '../claudia/helpers/pathConverter';

export class RequestContextHandler {
    private _container: Container;

    constructor(container: Container) {
        this._container = container;
    }

    middleware = async (request) => {
        const headers: IHeader[] = [];
        const params: IQueryParam[] = [];
        if(request.proxyRequest.headers)
            Object.getOwnPropertyNames(request.proxyRequest.headers)
                .forEach((key) => {
                    headers.push({
                        name: key,
                        value: request.proxyRequest.headers[key]
                    });
                });
        if(request.proxyRequest.queryStringParameters)
            Object.getOwnPropertyNames(request.proxyRequest.queryStringParameters)
                .forEach(key => {
                    params.push({
                        name: key,
                        value: request.proxyRequest.queryStringParameters[key]
                    });
                });

        const requestContext = new RequestContextBuilder()
            .setMethod(request.proxyRequest.httpMethod)
            .setPath(request.proxyRequest.path)
            .setHeaders(headers)
            .setQueryParams(params)
            .setBody(JSON.parse(request.proxyRequest.body))
            .build();

        const requestContainer = this._container.createChild({ defaultScope: "Request" });
        requestContainer.bind(RequestSymbols.RequestContext).toConstantValue(requestContext);

        /*
         * This is where we find and call the appropriate controller from inversify and handle the request.
         * And create a childContainer so that we can bind request scoped items.
         */
        const routeArgs = [];
        const routes = this._container.get<RegExp[]>('Parsed_Routes');
        const matches = routes.filter((route) => {
            return route.exec(claudiaPathToNapi(requestContext.path));
        });

        if (matches.length === 0) {
            throw new NotFoundException();
        }

        const match = matches.pop();
        const controller: any = this._container.getNamed(match.source, requestContext.method);
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

        return await requestContainer.resolve(controller)[routeHandler.key](...routeArgs);
    }
}