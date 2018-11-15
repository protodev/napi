import {
    controller, route, IController,
    get, post, put, del, options, queryParam
} from 'napi-server';
import { SampleResource } from '../resources/sampleResponse';
import { injectable } from '../../node_modules/inversify';
import { HttpVerb } from 'napi-utils';

@injectable()
@controller('/sample')
export class SampleController implements IController {
    static Public_Response = {
        public: 'response'
    }

    @get('/public')
    async publicRoute() {
        return SampleController.Public_Response
    }

    @post('/public')
    async postPublicRoute() {
        return SampleController.Public_Response
    }

    @put('/public')
    async putPublicRoute(context) {
        return SampleController.Public_Response
    }

    @del('/public')
    async deletePublicRoute(context) {
        return SampleController.Public_Response
    }

    @options('/public')
    async optionsPublicRoute(context) {
        return SampleController.Public_Response
    }

    @get('/parameter-test')
    async parameterTest(
        @queryParam('sample') sample: string,
        @queryParam('sample2') sample2: string) {

        return {
            sample,
            sample2
        }
    }
}