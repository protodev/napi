import { IRequestContext, IHeader, IQueryParam } from '@protodev/napi-common';

export class RequestContextBuilder {
    private _requestContext: IRequestContext;

    constructor() {
        this._requestContext = {
            path: null,
            method: null,
            host: null,
            port: null,
            params: [],
            variables: [],
            headers: [],
            body: null
        };
    }

    setPath(path: string) {
        this._requestContext.path = path;
        return this;
    }

    setHost(host: string) {
        this._requestContext.host = host;
        return this;
    }

    setPort(port: number) {
        this._requestContext.port = port;
        return this;
    }

    setHeaders(headers: IHeader[]) {
        this._requestContext.headers = headers;
        return this;
    }

    addHeader(header: IHeader) {
        this._requestContext.headers.push(header);
        return this;
    }

    addHeaders(headers: IHeader[]) {
        headers.forEach(h => this._requestContext.headers.push(h));
        return this;
    }

    setBody(body: any) {
        this._requestContext.body = body;
        return this;
    }

    setMethod(method: string) {
        this._requestContext.method = method;
        return this;
    }

    setQueryParams(queryParams: IQueryParam[]) {
        this._requestContext.params = queryParams;
        return this;
    }

    addQueryParam(queryParam: IQueryParam) {
        this._requestContext.params.push(queryParam);
        return this;
    }

    addQueryParams(queryParams: IQueryParam[]) {
        queryParams.forEach(p => this._requestContext.params.push(p));
        return this;
    }

    build(): IRequestContext {
        return this._requestContext;
    }
}