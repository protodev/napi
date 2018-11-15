import { IHeader } from "./iHeader";

export interface IHttpContext {
    path: string;
    method: string;
    host: string;
    port?: number;
    body?: any;
    headers: IHeader[]
}