import { ResourceQueryMappingMethod, ResourceResponseBodyType } from './Declarations';
export declare class ResourceGlobalConfig {
    static url: string | Promise<string>;
    static pathPrefix: string | Promise<string>;
    static path: string | Promise<string>;
    static headers: any | Promise<any>;
    static body: any | Promise<any>;
    static params: any | Promise<any>;
    static query: any | Promise<any>;
    static removeTrailingSlash: boolean;
    static addTimestamp: boolean | string;
    static withCredentials: boolean;
    static lean: boolean;
    static asPromise: boolean;
    static asResourceResponse: boolean;
    static responseBodyType: ResourceResponseBodyType;
    static queryMappingMethod: ResourceQueryMappingMethod;
}
