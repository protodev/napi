import { IMiddleware } from 'koa-router';
import { HttpVerb } from '@napi/utils';

export interface IRouteManager {
    addPublicRoute(verb?: HttpVerb, paths?: string[], ...middlewares: IMiddleware[]): void;
    addProtectedRoute(verb?: HttpVerb, paths?: string[], ...middlewares: IMiddleware[]): void;
    buildRoutes();
}