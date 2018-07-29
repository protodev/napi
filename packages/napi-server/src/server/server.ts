import * as Koa from 'koa';
import { injectable, inject } from 'inversify';
import { IServerInstance } from "../abstraction/server/iServer";
import { IRouteManager } from '../abstraction/router/iRouteManager';
import { IMiddleware } from 'koa-router';
import { IServerConfiguration } from '../abstraction/server/iServerConfiguration';
import { ServerConstants } from '../abstraction/constants/serverConstants';
import { RouteManagerConstants } from '../abstraction/constants/routeManagerConstants';
import { guardEmptyArray } from '@napi/utils';

@injectable()
export class Server implements IServerInstance {
    private _routeManager: IRouteManager;
    private _serverConfiguration: IServerConfiguration;
    private _koa: Koa;

    constructor(
        @inject(ServerConstants.ServerConfiguration) serverConfiguration: IServerConfiguration,
        @inject(RouteManagerConstants.RouteManager) routeManager: IRouteManager) {

        this._routeManager = routeManager;
        this._serverConfiguration = serverConfiguration;
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
        //this.middlewares(this._routeManager.buildRoutes());
        this._koa.listen(this._serverConfiguration.port);
    }
}