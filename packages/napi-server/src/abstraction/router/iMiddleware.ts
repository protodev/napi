import { Context } from "koa";

export interface IMiddleware {
    middleware (context: Context, next: Function): Promise<void>;
}