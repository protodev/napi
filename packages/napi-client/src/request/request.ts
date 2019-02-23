import Axios from 'axios';
import { IRequestContext } from '@protodev/napi-common';

export class Request<T> {
    async performRequest(requestContext: IRequestContext) {
        /*
        const response = Axios.request({
            url: requestContext.path,
            headers: requestContext
        });
        */
    }

    async get(url: string) {
        /*
        const response = await Axios.get<T>(url);
        return response.data;
        */
    }

    async post(url: string, body: T) {}

    async put(url: string, body: T) {}
}