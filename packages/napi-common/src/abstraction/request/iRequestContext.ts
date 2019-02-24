import { IQueryParam } from "./iQueryParam";
import { IPathVariable } from "./iPathVariable";
import { IHttpContext } from "../http/iHttpContext";

export interface IRequestContext extends IHttpContext {
    params?: IQueryParam[];
    variables?: IPathVariable[];
}