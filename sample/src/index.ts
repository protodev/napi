import 'reflect-metadata';
import { Container } from 'inversify';
import {
    IServerConfiguration,
    Server,
    ServerConstants,
    IRouteManagerConfiguration,
    RouteManager,
    RouteManagerConstants,
    IController,
    ControllerConstants
} from 'napi-server';
import { SampleController } from './controllers/sampleController';
import { HealthController } from './controllers/healthController';

const container = new Container();
container.bind<IServerConfiguration>(ServerConstants.ServerConfiguration).toConstantValue({
    name: 'napi-sample',
    version: '0.0.0',
    port: 3000
});

container.bind<IRouteManagerConfiguration>(RouteManagerConstants.RouteManagerConfiguration).toConstantValue({});
container.bind<RouteManager>(RouteManagerConstants.RouteManager)
    .to(RouteManager)
    .inSingletonScope();
container.bind<IController>(ControllerConstants.Controller).to(SampleController);
container.bind<IController>(ControllerConstants.Controller).to(HealthController);

new Server(container).start();