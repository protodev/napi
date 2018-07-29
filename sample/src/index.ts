import 'reflect-metadata';
import { Container } from 'inversify';
import {
    IServerInstance,
    IServerConfiguration,
    Server,
    ServerConstants,
    IRouteManager,
    IRouteManagerConfiguration,
    RouteManager,
    RouteManagerConstants
} from 'napi-server';

const container = new Container();

container.bind<IServerConfiguration>(ServerConstants.ServerConfiguration).toConstantValue({
    name: 'napi-sample',
    version: '0.0.0',
    port: 3000
});

container.bind<IRouteManagerConfiguration>(RouteManagerConstants.RouteManagerConfiguration).toConstantValue({});



container.bind<IServerInstance>(ServerConstants.Server)
    .to(Server)
    .inSingletonScope();

container.bind<RouteManager>(RouteManagerConstants.RouteManager)
    .to(RouteManager)
    .inSingletonScope();

container.get<IServerInstance>(ServerConstants.Server).start();