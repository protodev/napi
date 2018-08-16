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
        console.log(routes);
        this._koa.use(routes);
        this._koa.listen(this._serverConfiguration.port);
    }

    private registerControllers() {
        const controllers = this._container.getAll(ControllerConstants.Controller);

        controllers.forEach((controller: IController) => {
            const controllerMetadata = Reflect.getOwnMetadata(MetaData.controller, controller.constructor);
            const methodMetadata = Reflect.getOwnMetadata(MetaData.route, controller.constructor);

            methodMetadata.forEach((metadata) => {
                this._routeManager.addPublicRoute(
                    HttpVerb.Get,
                    [`${controllerMetadata.path}${metadata.path}`],
                    metadata.target[metadata.key]);
            });
        });
    }
}