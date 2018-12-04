import {
    controller, IController,
    get, post, put, del, options, queryParam, pathVariable,
    requestBody
} from 'napi-server';

@controller('/sample')
export class SampleController implements IController {
    static Public_Response = {
        public: 'response'
    }

    @get()
    async rootRoute() {
        return SampleController.Public_Response
    }

    @get('/public')
    async publicRoute() {
        return SampleController.Public_Response
    }    

    @post('/public')
    async postPublicRoute(@requestBody() body: Object) {
        return {
            verb: 'POST',
            echo: body
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