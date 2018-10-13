import { NotFoundException } from '@napi/common';
import { IMiddleware } from "../abstraction/router/iMiddleware";
import { Context } from "koa";

export class ExceptionHandler implements IMiddleware {
    async middleware(context: Context, next: Function): Promise<void> {
        try {
            await next();
            if (context.status === 404) throw new NotFoundException();
        } catch (exception) {
            context.status = exception.status || 500;
            context.body = {
                message: exception.message
            }
        }
    }
}