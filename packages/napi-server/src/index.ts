import { Server } from "./server/server";
import { IServerConfiguration } from "./abstraction/server/iServerConfiguration";
import { IServerInstance, IServerConstructor } from "./abstraction/server/iServer";
import { ServerConstants } from "./abstraction/constants/serverConstants";
import { IRouteManager } from "./abstraction/router/iRouteManager";
import { IRouteManagerConfiguration } from "./abstraction/router/iRouteManagerConfiguration";
import { RouteManagerConstants } from "./abstraction/constants/routeManagerConstants";
import { RouteManager } from "./router/routeManager";
import { controller } from "./decorators/controller";
import { service } from "./decorators/service";
import { route } from "./decorators/route";
import { IController } from './abstraction/iController';
import { ControllerConstants } from "./abstraction/constants/controllerConstants";

const Constants = {
    ServerConstants,
    RouteManagerConstants,
    ControllerConstants
}

const Decorators = {
    controller,
    service,
    route
}

export {
    IServerInstance,
    IServerConstructor,
    IServerConfiguration,
    Server,
    IRouteManager,
    IRouteManagerConfiguration,
    RouteManager,
    IController,
    Constants,
    ServerConstants,
    RouteManagerConstants,
    ControllerConstants,
    Decorators,
    controller,
    service,
    route
}