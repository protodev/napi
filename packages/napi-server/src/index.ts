import { Server } from "./server/server";
import { IServerConfiguration } from "./abstraction/server/iServerConfiguration";
import { IServerInstance } from "./abstraction/server/iServer";
import { ServerConstants } from "./abstraction/constants/serverConstants";
import { IRouteManagerConfiguration } from "./abstraction/router/iRouteManagerConfiguration";
import { RouteManagerConstants } from "./abstraction/constants/routeManagerConstants";
import { ControllerConstants } from "./abstraction/constants/controllerConstants";

const Constants = {
    ServerConstants,
    RouteManagerConstants,
    ControllerConstants
}



export {
    IServerInstance,
    IServerConfiguration,
    Server,
    IRouteManagerConfiguration,
    Constants,
    ServerConstants,
    RouteManagerConstants,
    ControllerConstants
}