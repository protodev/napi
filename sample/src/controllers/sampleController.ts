import { controller, route, IController } from 'napi-server';
import { SampleResource } from '../resources/sampleResponse';
import { injectable } from '../../node_modules/inversify';

@injectable()
@controller('/sample')
export class SampleController implements IController {

    @route('GET', '/public')
    async publicRoute(context) {
        context.body = {
            prop1: 'property 1',
            prop2: 'property 2'
        }
    }

    @route('GET', '/public2')
    async public2Route(context) {
        context.body = {
            foo: 'bar'
        }
    }
}