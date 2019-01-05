import { IMiddleware } from "koa-router";
import { IServerConfiguration } from "./iServerConfiguration";

export interface IServerInstance {
    bootstrap?: Function;
    start: Function;
    
    middleware(middleware: IMiddleware): IServerInstance;
    middlewares(...middlewares: IMiddleware[]): IServerInstance;
}