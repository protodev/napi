import * as PathToRegex from 'path-to-regexp';
import { Container } from 'inversify';
import {
    IController,
    MetaData,
    ControllerConstants,
    IRequestContext,
    RequestSymbols,
    NotFoundException
} from '@protodev/napi-common';

export abstract class Client {
    private _container: Container;

    constructor(container: Container) {
        this._container = container;
        this.registerControllers();
    }

    protected async performRequest(requestContext: IRequestContext) {
        const requestContainer = this._container.createChild({ defaultScope: "Request" });
        requestContainer.bind(RequestSymbols.RequestContext).toConstantValue(requestContext);

        /*
         * This is where we find and call the appropriate controller from inversify and handle the request.
         * And create a childContainer so that we can bind request scoped items.
         */
        const routeArgs = [];
        const routes = this._container.get<RegExp[]>('Parsed_Routes');
        const matches = routes.filter((route) => {
            return route.exec(requestContext.path);
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

        return await requestContainer.resolve(controller)[routeHandler.key](...routeArgs)
    }
    
    private registerControllers() {
        const controllers = this._container.getAll(ControllerConstants.Controller);
        const parsedRoutes = [];

        controllers.forEach((controller: IController) => {
            const controllerMetadata = Reflect.getOwnMetadata(MetaData.controller, controller.constructor);
            const methodMetadata = Reflect.getOwnMetadata(MetaData.route, controller.constructor);

            methodMetadata.forEach((metadata) => {
                const route = `${controllerMetadata.path ? controllerMetadata.path : ''}${metadata.path ? metadata.path : ''}`;
                const parsedRoute = PathToRegex(route);
                this._container.bind(parsedRoute.source)
                    .toConstantValue(controller.constructor)
                    .whenTargetNamed(`${metadata.method}`);
                parsedRoutes.push(parsedRoute);

                console.log({
                    className: this.constructor.name,
                    message: `Adding ${metadata.method}: ${route} handler.`
                });
            });
        });

        this._container.bind('Parsed_Routes')
            .toConstantValue(parsedRoutes);
    }
}