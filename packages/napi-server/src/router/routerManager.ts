import { IRouteManager } from '../abstraction/router/iRouteManager';
import { IRouteManagerConfiguration } from '../abstraction/router/iRouteManagerConfiguration';
import { injectable, inject } from 'inversify';
import { RouteManagerConstants } from '../abstraction/constants/routeManagerConstants';

@injectable()
export class RouteManager {
    private _configuration: IRouteManagerConfiguration;
    constructor(
        @inject(RouteManagerConstants.RouteManagerConfiguration) configuration: IRouteManagerConfiguration) {
            
        this._configuration = configuration;
    }
}