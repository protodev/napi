import { IHeader } from "./iHeader";

export interface IHttpContext {
    path: string;
    host: string;
    port?: number;
    body?: any;
    headers: IHeader[]
}