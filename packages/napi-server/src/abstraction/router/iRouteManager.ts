import { IMiddleware } from 'koa-router';
import { IRouteManagerConfiguration } from './iRouteManagerConfiguration';
import { HttpVerb } from '@napi/utils';

export interface IRouteManager {
    new(configuration: IRouteManagerConfiguration, protectedRouteMiddlware): IRouteManager;

    addPublicRoute(verb?: HttpVerb, paths?: string[], ...middlewares: IMiddleware[]): void;
    addProtectedRoute(verb?: HttpVerb, paths?: string[], ...middlewares: IMiddleware[]): void;
    buildRoutes();
}