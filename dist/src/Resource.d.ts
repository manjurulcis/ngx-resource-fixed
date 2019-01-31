import { IResourceAction, IResourceActionInner, IResourceResponse, ResourceQueryMappingMethod } from './Declarations';
import { ResourceHandler } from './ResourceHandler';
export declare class Resource {
    protected requestHandler: ResourceHandler;
    private $url;
    private $pathPrefix;
    private $path;
    private $headers;
    private $body;
    private $params;
    private $query;
    constructor(requestHandler: ResourceHandler);
    /**
     * Used to get url
     *
     * @param {IResourceAction} actionOptions
     * @return {string | Promise<string>}
     */
    $getUrl(actionOptions?: IResourceAction): string | Promise<string>;
    $setUrl(url: string): void;
    /**
     * Used to get path prefix
     *
     * @param {IResourceAction} actionOptions
     * @return {string | Promise<string>}
     */
    $getPathPrefix(actionOptions?: IResourceAction): string | Promise<string>;
    $setPathPrefix(path: string): void;
    /**
     * Used to get path
     *
     * @param {IResourceAction} actionOptions
     * @return {string | Promise<string>}
     */
    $getPath(actionOptions?: IResourceAction): string | Promise<string>;
    $setPath(path: string): void;
    /**
     * Get headers.
     *
     * @param {IResourceAction} actionOptions
     * @return {any | Promise<any>}
     */
    $getHeaders(actionOptions?: IResourceAction): any | Promise<any>;
    $setHeaders(headers: any): void;
    /**
     * Get body
     *
     * @param {IResourceAction} actionOptions
     * @return {any | Promise<any>}
     */
    $getBody(actionOptions?: IResourceAction): any | Promise<any>;
    $setBody(body: any): void;
    /**
     * Get path params
     *
     * @param {IResourceAction} actionOptions
     * @return {any | Promise<any>}
     */
    $getParams(actionOptions?: IResourceAction): any | Promise<any>;
    $setParams(params: any): void;
    /**
     * Get query params
     *
     * @param {IResourceAction} actionOptions
     * @return {any | Promise<any>}
     */
    $getQuery(actionOptions?: IResourceAction): any | Promise<any>;
    $setQuery(query: any): void;
    /**
     * Used to filter received data.
     * Is applied on each element of array or object
     *
     * @param data
     * @param {IResourceActionInner} options
     * @return {boolean}
     */
    $filter(data: any, options?: IResourceActionInner): boolean;
    /**
     * Used to map received data
     * Is applied on each element of array or object
     *
     * @param data
     * @param {IResourceActionInner} options
     * @return {any}
     */
    $map(data: any, options?: IResourceActionInner): any;
    /**
     * Used to create result object
     * Is applied on each element of array or object
     *
     * @param data
     * @param {IResourceActionInner} options
     * @return {any}
     */
    $resultFactory(data: any, options?: IResourceActionInner): any;
    $restAction(options: IResourceActionInner): any;
    protected $handleSuccessResponse(options: IResourceActionInner, resp: IResourceResponse): any;
    protected $handleErrorResponse(options: IResourceActionInner, resp: IResourceResponse): any;
    protected $setRequestOptionsUrl(options: IResourceActionInner): void;
    protected $setRequestOptionsBody(options: IResourceActionInner): void;
    protected $setRequestOptionsQuery(options: IResourceActionInner): void;
    protected $appendQueryParams(query: {
        [prop: string]: string | any[];
    }, key: string, value: any, queryMappingMethod: ResourceQueryMappingMethod): void;
    protected $_setResourceActionInnerDefaults(options: IResourceActionInner): void;
    protected $_setResourceActionOptionDefaults(options: IResourceActionInner): void;
    protected $_setResolvedOptions(options: IResourceActionInner): Promise<IResourceActionInner>;
    protected $_createRequestOptions(options: IResourceActionInner): IResourceActionInner | Promise<IResourceActionInner>;
    protected $_canSetInternalData(options: IResourceActionInner): boolean;
}
