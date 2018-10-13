import { controller, route, IController, get, post, put, del, options } from 'napi-server';
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
    async publicRoute(context) {
        context.body = SampleController.Public_Response
    }

    @post('/public')
    async postPublicRoute(context) {
        context.body = SampleController.Public_Response
    }

    @put('/public')
    async putPublicRoute(context) {
        context.body = SampleController.Public_Response
    }

    @del('/public')
    async deletePublicRoute(context) {
        context.body = SampleController.Public_Response
    }

    @options('/public')
    async optionsPublicRoute(context) {
        context.body = SampleController.Public_Response
    }
}