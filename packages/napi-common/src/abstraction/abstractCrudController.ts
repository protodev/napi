import { IController } from "./iController";
export interface ICrudController<T, F> extends IController{
    fetchResource?(id?: string): Promise<T>;
    searchResources?(criteria?: F): Promise<T[]>;
    createResource?(resource?: T): Promise<T>;
    updateResource?(resource?: T): Promise<T>;
    deleteResource?(id?: string): Promise<void>;
}

export abstract class AbstractCrudController<T, F> implements ICrudController<T, F> {}