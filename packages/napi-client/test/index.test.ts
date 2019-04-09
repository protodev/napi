import 'mocha';
import { expect } from 'chai';
import { Client } from '../src/client';
import { Container, inject, injectable } from 'inversify';
import {
    IController,
    IService,
    controller,
    get,
    ControllerConstants,
    CrudService,
    AbstractCrudController
} from '@protodev/napi-common';

class HealthResource {
    status: 'up'
}

interface ITestController extends IController {
    getHealth(): Promise<any>;
}

class TestService extends CrudService<HealthResource, null> {
    async fetchResource(): Promise<HealthResource> {
        return new HealthResource();
    }
}

@controller()
class TestController extends AbstractCrudController<HealthResource, null> {
    private testService: CrudService<HealthResource, null>;

    constructor(
        @inject(TestService) testService: CrudService<HealthResource, null>) {
        super();
        this.testService = testService;
    }

    @get('/health')
    async fetchResource(): Promise<HealthResource> {
        return await this.testService.fetchResource();
    }
}

class TestClient extends Client {}

const con = new Container();
con.bind<IController>(ControllerConstants.Controller).to(TestController);
con.bind<IService>(TestService).to(TestService);

describe('Client', () => {
    it('should performRequests', async () => {
        const client = new TestClient();

        const r = await client.performRequest({
            path: '/health',
            method: 'GET',
            host: 'localhost',
            href: 'http://localhost:3000/health',
            params: []
        });
        
        expect(r).to.equal({});
    });
});