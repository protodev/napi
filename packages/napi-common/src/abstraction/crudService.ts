import { service } from "../decorators/service";
import { IService } from "./iService";
export interface CrudService<T,F> extends IService {
    fetchResource?(id?: string): Promise<T>;
    searchResources?(criteria?: F): Promise<T[]>;
    createResource?(resource?: T): Promise<T>;
    updateResource?(resource?: T): Promise<T>;
    deleteResource?(id?: string): Promise<void>;
}

@service()
export abstract class CrudService<T, F> {}