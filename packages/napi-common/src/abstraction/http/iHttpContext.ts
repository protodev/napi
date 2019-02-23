import { IHeader } from "./iHeader";

export interface IHttpContext {
    path: string;
    method: string;
    host: string;
    href: string;
    etag: string;
    port?: number;
    body?: any;
    headers: IHeader[],
}