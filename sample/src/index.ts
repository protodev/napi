import 'reflect-metadata';
import { Container } from 'inversify';
import {
    IServerConfiguration,
    Server,
    ServerConstants,
    ControllerConstants
} from 'napi-server';
import {
    IController
} from 'napi-common';
import { SampleController } from './controllers/sampleController';
import { HealthController } from './controllers/healthController';

const container = new Container();
container.bind<IServerConfiguration>(ServerConstants.ServerConfiguration).toConstantValue({
    name: 'napi-sample',
    version: '0.0.0',
    port: 3000
});

container.bind('text').toConstantValue('injected text');
container.bind<IController>(ControllerConstants.Controller).to(SampleController);
container.bind<IController>(ControllerConstants.Controller).to(HealthController);

new Server(container).start();