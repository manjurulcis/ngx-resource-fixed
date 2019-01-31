import { ResourceCRUD } from './ResourceCommon/ResourceCRUD';
export declare abstract class ResourceModel {
    static resourceInstance: ResourceCRUD<any, any, any>;
    protected static methodQuery: string;
    protected static methodGet: string;
    protected static methodCreate: string;
    protected static methodUpdate: string;
    protected static methodRemove: string;
    static get(id: string | number): Promise<any>;
    static query(query?: any): Promise<any>;
    static remove(id: string | number): Promise<void>;
    private static getInstance();
    readonly abstract $resource: any;
    $resolved: boolean;
    $promise: Promise<any>;
    $abort: () => void;
    $setData(data: any): this;
    $save(query?: any, params?: any): this;
    $create(query?: any, params?: any): this;
    $update(query?: any, params?: any): this;
    $remove(query?: any, params?: any): this;
    toJSON(): any;
    protected isNew(): boolean;
    protected $getResourceWithMethodCheck(methodName: string): any;
    protected $executeResourceMethod(methodName: string, query?: any, params?: any): this;
}
