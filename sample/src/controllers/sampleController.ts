import { inject, optional } from 'inversify';
import {
    controller, IController,
    get, post, put, del, options, queryParam, pathVariable,
    requestBody
} from 'napi-server';
import {
    RequestSymbols,
    IRequestContext
} from 'napi-common';

@controller('/sample')
export class SampleController implements IController {
    private _requestContext: IRequestContext;
    static Public_Response = {
        public: 'response'
    }

    constructor(
        @optional()
        @inject(RequestSymbols.RequestContext)
        requestContext?: IRequestContext) {
        this._requestContext = requestContext;
    }

    @get()
    async rootRoute() {
        return {
            response: SampleController.Public_Response,
            context: this._requestContext
        }
    }

    @get('/public')
    async publicRoute() {
        return SampleController.Public_Response
    }

    @post('/public')
    async postPublicRoute(@requestBody() body: Object) {
        return {
            verb: 'POST',
            echo: body,
            requestContext: this._requestContext
        }
    }

    @put('/public')
    async putPublicRoute(@requestBody() body: Object) {
        return {
            verb: 'PUT',
            echo: body
        }
    }

    @del('/public')
    async deletePublicRoute() {
        return SampleController.Public_Response
    }

    @options('/public')
    async optionsPublicRoute() {
        return SampleController.Public_Response
    }

    @get('/parameter-test/:thing/:thing2')
    async parameterTest(
        @queryParam('sample') sample: string,
        @queryParam('sample2') sample2: string,
        @pathVariable('thing2') thing2: string,
        @pathVariable('thing') thing: string
    ) {
        return {
            sample,
            sample2,
            thing,
            thing2
        }
    }
}