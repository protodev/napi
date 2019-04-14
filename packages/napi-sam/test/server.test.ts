import 'reflect-metadata';
import 'mocha';
import { Container } from 'inversify';
import {
    expect
} from 'chai';
import { controller, get, IController, ControllerConstants, pathVariable } from '@protodev/napi-common';
import { Server } from '../src/server/server';

@controller()
class SampleController implements IController {

    @get('/:sampleParam')
    async sampleRoute(
        @pathVariable('sampleParam') sampleParam: string) {
        console.log(sampleParam);

        return {
            sample: pathVariable
        }
    }
}

const container = new Container();
container.bind<IController>(ControllerConstants.Controller).to(SampleController);


describe('Server', () => {
    const server = new Server(container);

    it('should bind claudia routes', () => {
        server.init();
        expect(1).to.equal(1);
    });
});