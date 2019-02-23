import { Server } from "./server/server";
import { IServerConfiguration } from "./abstraction/server/iServerConfiguration";
import { IServerInstance } from "./abstraction/server/iServer";
import { ServerConstants } from "./abstraction/constants/serverConstants";
import { IRouteManagerConfiguration } from "./abstraction/router/iRouteManagerConfiguration";
import { RouteManagerConstants } from "./abstraction/constants/routeManagerConstants";

const Constants = {
    ServerConstants,
    RouteManagerConstants
}



export {
    IServerInstance,
    IServerConfiguration,
    Server,
    IRouteManagerConfiguration,
    Constants,
    ServerConstants,
    RouteManagerConstants
}