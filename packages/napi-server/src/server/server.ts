import 'reflect-metadata';
import * as Koa from 'koa';
import { Container } from 'inversify';
import { IServerInstance } from "../abstraction/server/iServer";
import { IRouteManager } from '../abstraction/router/iRouteManager';
import { IMiddleware } from 'koa-router';
import { IServerConfiguration } from '../abstraction/server/iServerConfiguration';
import { ServerConstants } from '../abstraction/constants/serverConstants';
import { RouteManagerConstants } from '../abstraction/constants/routeManagerConstants';
import { guardEmptyArray, HttpVerb } from '../../../napi-utils/dist';
import { ControllerConstants } from '../abstraction/constants/controllerConstants';
import { controller } from '../decorators/controller';
import { IController } from '../abstraction/iController';
import { MetaData } from '../abstraction/constants/metaData';
import { ExceptionHandler } from '../middleware/exceptionHandler';
import { RequestContextHandler } from '../middleware/requestContextHandler';

export class Server implements IServerInstance {
    private _container: Container;
    private _routeManager: IRouteManager;
    private _serverConfiguration: IServerConfiguration;
    private _koa: Koa;

    constructor(container: Container) {
        this._routeManager = container.get<IRouteManager>(RouteManagerConstants.RouteManager);
        this._serverConfiguration = container.get<IServerConfiguration>(ServerConstants.ServerConfiguration);
        this._container = container;
        this._koa = new Koa();
    }

    middleware(middleware: IMiddleware): Server {
        this._koa.use(middleware);
        return this;
    }

    middlewares(...middlewares: IMiddleware[]): Server {
        guardEmptyArray(middlewares);

        middlewares.forEach(middleware => {
            this._koa.use(middleware);
        });

        return this;
    }

    start() {
        this.registerControllers();
        const routes = this._routeManager.buildRoutes();

        this._koa.use(new ExceptionHandler().middleware);
        this._koa.use(new RequestContextHandler(this._container).middleware);
        this._koa.use(routes);
        this._koa.listen(this._serverConfiguration.port);
    }

    private registerControllers() {
        const controllers = this._container.getAll(ControllerConstants.Controller);

        controllers.forEach((controller: IController) => {
            const controllerMetadata = Reflect.getOwnMetadata(MetaData.controller, controller.constructor);
            const methodMetadata = Reflect.getOwnMetadata(MetaData.route, controller.constructor);

            methodMetadata.forEach((metadata) => {
                console.log(`Adding ${metadata.method}: ${controllerMetadata.path}${metadata.path} handler.`)
                this._container.bind(`${controllerMetadata.path}${metadata.path}`)
                    .toConstantValue(controller.constructor)
                    .whenTargetNamed(`${metadata.method}`);
            });
        });
    }
}