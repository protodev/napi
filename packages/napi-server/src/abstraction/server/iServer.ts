import { IRouteManager } from "../router/iRouteManager";
import { IMiddleware } from "koa-router";
import { IServerConfiguration } from "./iServerConfiguration";

export interface IServerConstructor {
    new(serverConfiguration: IServerConfiguration,
        routeManager: IRouteManager
    ): IServerInstance;
}

export interface IServerInstance {
    bootstrap?: Function;
    start: Function;
    
    middleware(middleware: IMiddleware): IServerInstance;
    middlewares(...middlewares: IMiddleware[]): IServerInstance;
}