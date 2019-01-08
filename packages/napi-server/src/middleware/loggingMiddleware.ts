const nanoid = require('nanoid');
import { Logger } from '@protodev/napi-common';
import { IMiddleware } from "../abstraction/router/iMiddleware";
import { Context } from 'koa';

export class LoggingMiddleware implements IMiddleware {
    middleware = async (context: Context, next: Function): Promise<void> => {
        this.applySluethHeaders(context);
        this.logRequest(context);
        const recievedTime = new Date();
        await next();
        console.log({
            trace: context.response.headers['x-b3-traceid'],
            className: this.constructor.name,
            message: `Response ${context.request.method} ${context.request.path} took ${new Date().getTime() - recievedTime.getTime()}ms.`
        });
    }

    private logRequest(context: Context) {
        const traceId = context.response.headers['x-b3-traceid'];
        const headersString = JSON.stringify(context.request.headers, null, 2);
        const bodyString = JSON.stringify(context.request.body, null, 2);
        const paramsString = JSON.stringify(context.request.query, null, 2);

        const headerLogParts = ['---- Headers ----', '', headersString, ''];
        const bodyLogParts = ['---- Body ----', '', bodyString, ''];
        const paramLogParts = ['---- Params ----', paramsString, ''];

        if (process.env.NODE_ENV === 'production') {
            console.log({
                trace: traceId,
                className: this.constructor.name,
                message: `Request ${context.request.method} ${context.request.path}`,
                headers: headersString,
                params: paramsString,
                body: bodyString
            });
        } else {
            this.logMessage(`Request ${context.request.method} ${context.request.path}.\n${headerLogParts
                .join('\n').replace(/\n\r?/g, '\n\t')}\n${paramLogParts
                    .join('\n').replace(/\n\r?/g, '\n\t')}\n${bodyLogParts
                        .join('\n').replace(/\n\r?/g, '\n\t')}`, traceId);
        }
    }

    private logMessage(message: string, traceId: string) {
        console.log({
            trace: traceId,
            className: this.constructor.name,
            message: message
        });
    }

    private applySluethHeaders(context: Context) {
        context.set('x-b3-traceid', !context.get('x-b3-traceid') ? nanoid(32) : context.get('x-b3-traceid'));
        context.set('x-b3-parentspanid', !context.get('x-b3-parentspanid') ? nanoid(16) : context.get('x-b3-parentspanid'));
        context.set('x-b3-spanid', !context.get('x-b3-spanid') ? nanoid(16) : context.get('x-b3-spanid'));
    }
}
