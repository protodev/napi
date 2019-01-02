import 'reflect-metadata';
import * as Koa from 'koa';
import * as PathToRegex from 'path-to-regexp';
import * as BodyParser from 'koa-bodyparser';
import { Container } from 'inversify';
import { IServerInstance } from "../abstraction/server/iServer";
import { IMiddleware } from 'koa-router';
import { IServerConfiguration } from '../abstraction/server/iServerConfiguration';
import { ServerConstants } from '../abstraction/constants/serverConstants';
import { guardEmptyArray } from '@protodev/napi-utils';
import { ControllerConstants } from '../abstraction/constants/controllerConstants';
import { IController } from '../abstraction/iController';
import { MetaData } from '../abstraction/constants/metaData';
import { ExceptionHandler } from '../middleware/exceptionHandler';
import { RequestContextHandler } from '../middleware/requestContextHandler';
import { Logger } from '@protodev/napi-common';
import { LoggingMiddleware } from '../middleware/loggingMiddleware';

export class Server implements IServerInstance {
    private _container: Container;
    private _serverConfiguration: IServerConfiguration;
    private _koa: Koa;
    private _logger: Logger;

    constructor(container: Container) {
        this._serverConfiguration = container.get<IServerConfiguration>(ServerConstants.ServerConfiguration);
        this._container = container;
        this._koa = new Koa();
        this._logger = new Logger({}, true);
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

        this._koa.use(BodyParser());
        this._koa.use(new ExceptionHandler().middleware);
        this._koa.use(new LoggingMiddleware().middleware);
        this._koa.use(new RequestContextHandler(this._container).middleware);
        this._koa.listen(this._serverConfiguration.port);
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