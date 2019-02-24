import 'mocha';
import { expect } from 'chai';
import { Client } from '../src/client';
import { Container } from 'inversify';
import { IController, controller, get, ControllerConstants } from '@protodev/napi-common';

const response = {
    status: 'up'
};

@controller()
class TestController implements IController {
    
    @get('/health')
    async getHealth() {
        return response;
    }
}

class TestClient extends Client {
    constructor(container: Container) {
        super(container);
    }
}

const con = new Container();
con.bind<IController>(ControllerConstants.Controller).to(TestController)

describe('Client', () => {
    it('should performRequests', async () => {
        const client = new TestClient(con);
        const response = await client.performRequest({
            path: '/health',
            method: 'GET',
            host: 'localhost',
            href: 'http://localhost:3000/health',
            params: []
        });

        expect(response).to.equal(response);
    });
});