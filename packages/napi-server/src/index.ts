import { Server } from "./server/server";
import { IServerConfiguration } from "./abstraction/server/iServerConfiguration";
import { IServerInstance, IServerConstructor } from "./abstraction/server/iServer";
import { ServerConstants } from "./abstraction/constants/serverConstants";
import { IRouteManager } from "./abstraction/router/iRouteManager";
import { IRouteManagerConfiguration } from "./abstraction/router/iRouteManagerConfiguration";
import { RouteManagerConstants } from "./abstraction/constants/routeManagerConstants";
import { RouteManager } from "./router/routerManager";

const Constants = {
    ServerConstants,
    RouteManagerConstants
}

export {
    IServerInstance,
    IServerConstructor,
    IServerConfiguration,
    Server,
    IRouteManager,
    IRouteManagerConfiguration,
    RouteManager,
    Constants,
    ServerConstants,
    RouteManagerConstants
}