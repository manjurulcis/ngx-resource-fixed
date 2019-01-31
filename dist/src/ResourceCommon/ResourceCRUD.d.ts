import { Resource } from '../Resource';
import { IResourceMethod } from '../Declarations';
export declare abstract class ResourceCRUD<TQuery, TShort, TFull, TQueryResult = TShort[]> extends Resource {
    query: IResourceMethod<TQuery, TQueryResult>;
    get: IResourceMethod<{
        id: any;
    }, TFull>;
    save: IResourceMethod<TFull, TFull>;
    update: IResourceMethod<TFull, TFull>;
    remove: IResourceMethod<{
        id: any;
    }, any>;
    patch: IResourceMethod<{
        id: any;
    } & Partial<TFull>, TFull>;
    create(data: TFull, callback?: (res: TFull) => any): Promise<TFull>;
}
