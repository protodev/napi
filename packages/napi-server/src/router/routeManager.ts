import * as Router from 'koa-router';
import { HttpVerb } from '@protodev/napi-utils';
import { injectable, inject } from 'inversify';
import { IRouteManager } from '../abstraction/router/iRouteManager';
import { IRouteManagerConfiguration } from '../abstraction/router/iRouteManagerConfiguration';
import { RouteManagerConstants } from '../abstraction/constants/routeManagerConstants';
import { ExceptionHandler } from '../middleware/exceptionHandler';

@injectable()
export class RouteManager implements IRouteManager {
    private _configuration: IRouteManagerConfiguration;
    private _koaRouter: Router;

    constructor(
        @inject(RouteManagerConstants.RouteManagerConfiguration) configuration: IRouteManagerConfiguration) {
        this._configuration = configuration;
        this._koaRouter = new Router();
    }

    addPublicRoute(verb?: HttpVerb, paths?: string[], ...middlewares: Router.IMiddleware[]): void {
        paths.forEach((path) => {
            console.log('BindingRoute:', verb, path);
            this._koaRouter[verb.toLowerCase()](path, ...middlewares);
        })
    }
    
    addProtectedRoute(verb?: HttpVerb, paths?: string[], ...middlewares: Router.IMiddleware[]): void {

    }

    buildRoutes() {
        return this._koaRouter.routes();
    }
}