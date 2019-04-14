import * as ApiBuilder from 'claudia-api-builder';
import * as PathToRegex from 'path-to-regexp';
import { Container } from 'inversify';
import { Logger, ControllerConstants, IController, MetaData } from '@protodev/napi-common'
import { RequestContextHandler } from '../middleware/requestContextHandler';
import { napiPathToClaudia } from '../claudia/helpers/pathConverter';

export class Server {
    private _container: Container;
    private _api = new ApiBuilder();

    constructor(container: Container) {
        this._container = container;
    }

    init() {
        this.registerControllers();
    }

    start() {
        return this._api;
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

                // NOTE: Bind claudia API routes.
                this._api[metadata.method.toLowerCase()](
                    napiPathToClaudia(route),
                    async (request) => {
                        return await new RequestContextHandler(this._container).middleware(request)
                    });

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