import 'mocha';
import { expect } from 'chai';
import { Container } from 'inversify';
import { get, controller, IController, ControllerConstants, pathVariable } from '@protodev/napi-common';
import { Server } from '../../src/server/server';
import { RequestContextHandler } from '../../src/middleware/requestContextHandler';
import { pathToFileURL } from 'url';

@controller()
class SampleController implements IController {

    @get('/:sampleParam')
    async sampleRoute(@pathVariable('sampleParam') sampleParam: string) {
        console.log(sampleParam);

        return {
            sample: sampleParam
        }
    }
}

const sampleRequest = require('../data/request.json');
const container = new Container();
container.bind<IController>(ControllerConstants.Controller).to(SampleController);

describe('requestContextHandler', () => {
    const server = new Server(container);
    server.init();

    it('should handle requests', async () => {
        const response =
            await new RequestContextHandler(container).middleware(sampleRequest);

        expect(response).to.deep.equal({
            sample: 'thing'
        });
    });
});