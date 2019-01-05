import { Server } from "./server/server";
import { IServerConfiguration } from "./abstraction/server/iServerConfiguration";
import { IServerInstance } from "./abstraction/server/iServer";
import { ServerConstants } from "./abstraction/constants/serverConstants";
import { IRouteManagerConfiguration } from "./abstraction/router/iRouteManagerConfiguration";
import { RouteManagerConstants } from "./abstraction/constants/routeManagerConstants";
import { controller } from "./decorators/controller";
import { service } from "./decorators/service";
import { route, get, post, put, patch, del, options } from "./decorators/route";
import { IController } from './abstraction/iController';
import { ControllerConstants } from "./abstraction/constants/controllerConstants";
import { queryParam, pathVariable, requestBody } from "./decorators/requestDecorators";

const Constants = {
    ServerConstants,
    RouteManagerConstants,
    ControllerConstants
}

const Decorators = {
    controller,
    service,
    route,
    get,
    post,
    put,
    patch,
    del,
    options,
    request: {
        queryParam,
        pathVariable,
        requestBody
    }
}

export {
    IServerInstance,
    IServerConfiguration,
    Server,
    IRouteManagerConfiguration,
    IController,
    Constants,
    ServerConstants,
    RouteManagerConstants,
    ControllerConstants,
    Decorators,
    controller,
    service,
    route,
    get,
    post,
    put,
    patch,
    del,
    options,
    queryParam,
    pathVariable,
    requestBody
}