var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { ResourceQueryMappingMethod, ResourceRequestBodyType, ResourceRequestMethod } from './Declarations';
import { ResourceGlobalConfig } from './ResourceGlobalConfig';
import { ResourceHelper } from './ResourceHelper';
var Resource = /** @class */ (function () {
    function Resource(requestHandler) {
        this.requestHandler = requestHandler;
        this.$url = null;
        this.$pathPrefix = null;
        this.$path = null;
        this.$headers = null;
        this.$body = null;
        this.$params = null;
        this.$query = null;
        this.constructor.instance = this;
    }
    /**
     * Used to get url
     *
     * @param {IResourceAction} actionOptions
     * @return {string | Promise<string>}
     */
    Resource.prototype.$getUrl = function (actionOptions) {
        if (actionOptions === void 0) { actionOptions = {}; }
        return this.$url || actionOptions.url || ResourceGlobalConfig.url || '';
    };
    Resource.prototype.$setUrl = function (url) {
        this.$url = url;
    };
    /**
     * Used to get path prefix
     *
     * @param {IResourceAction} actionOptions
     * @return {string | Promise<string>}
     */
    Resource.prototype.$getPathPrefix = function (actionOptions) {
        if (actionOptions === void 0) { actionOptions = {}; }
        return this.$pathPrefix || actionOptions.pathPrefix || ResourceGlobalConfig.pathPrefix || '';
    };
    Resource.prototype.$setPathPrefix = function (path) {
        this.$pathPrefix = path;
    };
    /**
     * Used to get path
     *
     * @param {IResourceAction} actionOptions
     * @return {string | Promise<string>}
     */
    Resource.prototype.$getPath = function (actionOptions) {
        if (actionOptions === void 0) { actionOptions = {}; }
        return this.$path || actionOptions.path || ResourceGlobalConfig.path || '';
    };
    Resource.prototype.$setPath = function (path) {
        this.$path = path;
    };
    /**
     * Get headers.
     *
     * @param {IResourceAction} actionOptions
     * @return {any | Promise<any>}
     */
    Resource.prototype.$getHeaders = function (actionOptions) {
        if (actionOptions === void 0) { actionOptions = {}; }
        return this.$headers || actionOptions.headers || ResourceGlobalConfig.headers || {};
    };
    Resource.prototype.$setHeaders = function (headers) {
        this.$headers = headers;
    };
    /**
     * Get body
     *
     * @param {IResourceAction} actionOptions
     * @return {any | Promise<any>}
     */
    Resource.prototype.$getBody = function (actionOptions) {
        if (actionOptions === void 0) { actionOptions = {}; }
        return this.$body || actionOptions.body || ResourceGlobalConfig.body || {};
    };
    Resource.prototype.$setBody = function (body) {
        this.$body = body;
    };
    /**
     * Get path params
     *
     * @param {IResourceAction} actionOptions
     * @return {any | Promise<any>}
     */
    Resource.prototype.$getParams = function (actionOptions) {
        if (actionOptions === void 0) { actionOptions = {}; }
        return this.$params || actionOptions.params || ResourceGlobalConfig.params || {};
    };
    Resource.prototype.$setParams = function (params) {
        this.$params = params;
    };
    /**
     * Get query params
     *
     * @param {IResourceAction} actionOptions
     * @return {any | Promise<any>}
     */
    Resource.prototype.$getQuery = function (actionOptions) {
        if (actionOptions === void 0) { actionOptions = {}; }
        return this.$query || actionOptions.query || ResourceGlobalConfig.query || {};
    };
    Resource.prototype.$setQuery = function (query) {
        this.$query = query;
    };
    /**
     * Used to filter received data.
     * Is applied on each element of array or object
     *
     * @param data
     * @param {IResourceActionInner} options
     * @return {boolean}
     */
    Resource.prototype.$filter = function (data, options) {
        if (options === void 0) { options = {}; }
        return true;
    };
    /**
     * Used to map received data
     * Is applied on each element of array or object
     *
     * @param data
     * @param {IResourceActionInner} options
     * @return {any}
     */
    Resource.prototype.$map = function (data, options) {
        if (options === void 0) { options = {}; }
        return data;
    };
    /**
     * Used to create result object
     * Is applied on each element of array or object
     *
     * @param data
     * @param {IResourceActionInner} options
     * @return {any}
     */
    Resource.prototype.$resultFactory = function (data, options) {
        if (options === void 0) { options = {}; }
        return data || {};
    };
    Resource.prototype.$restAction = function (options) {
        var _this = this;
        this.$_setResourceActionInnerDefaults(options);
        this.$_setResourceActionOptionDefaults(options);
        var actionOptions = options.actionOptions;
        if (actionOptions.mutateBody || options.isModel) {
            options.returnData = options.actionAttributes.body;
        }
        if (!actionOptions.asPromise) {
            options.returnData = actionOptions.expectJsonArray ? [] : actionOptions.resultFactory.call(this, null, options);
        }
        if (this.$_canSetInternalData(options)) {
            Object.defineProperty(options.returnData, '$resolved', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(options.returnData, '$abort', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function () {
                    // does nothing for now
                }
            });
        }
        options.mainPromise = this.$_setResolvedOptions(options)
            .then(function (o) { return _this.$_createRequestOptions(o); })
            .then(function (o) {
            var handlerResp = _this.requestHandler.handle(o.requestOptions);
            if (o.returnData && _this.$_canSetInternalData(options)) {
                o.returnData.$abort = handlerResp.abort;
            }
            return handlerResp.promise;
        })
            .then(function (resp) { return _this.$handleSuccessResponse(options, resp); })
            .catch(function (resp) { return _this.$handleErrorResponse(options, resp); });
        if (this.$_canSetInternalData(options)) {
            Object.defineProperty(options.returnData, '$promise', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: options.mainPromise
            });
        }
        return actionOptions.asPromise ? options.mainPromise : options.returnData;
    };
    Resource.prototype.$handleSuccessResponse = function (options, resp) {
        var _this = this;
        var body = resp.body;
        var actionOptions = options.actionOptions;
        if (Array.isArray(body)) {
            body = body
                .filter(function (item) { return actionOptions.filter.call(_this, item, options); })
                .map(function (item) {
                item = actionOptions.map.call(_this, item, options);
                return actionOptions.resultFactory.call(_this, item, options);
            });
            if (options.returnData) {
                Array.prototype.push.apply(options.returnData, body);
                body = options.returnData;
            }
        }
        else {
            if (actionOptions.filter.call(this, body, options)) {
                body = actionOptions.map.call(this, body, options);
                var newBody = options.returnData;
                if (newBody) {
                    if (typeof newBody.$setData === 'function') {
                        newBody.$setData(body);
                    }
                    else {
                        Object.assign(newBody, body);
                    }
                }
                else {
                    newBody = actionOptions.resultFactory.call(this, body, options);
                }
                body = newBody;
                // If it's model
                if (body.$resource) {
                    body.$resolved = true;
                    body.$promise = options.mainPromise;
                    body.$abort = function () { return true; };
                }
            }
            else {
                body = null;
            }
        }
        if (this.$_canSetInternalData(options)) {
            options.returnData.$resolved = true;
        }
        if (options.actionOptions.asResourceResponse) {
            resp.body = body;
            body = resp;
        }
        if (options.actionAttributes.onSuccess) {
            options.actionAttributes.onSuccess(body);
        }
        return body;
    };
    Resource.prototype.$handleErrorResponse = function (options, resp) {
        if (options.returnData && this.$_canSetInternalData(options)) {
            options.returnData.$resolved = true;
        }
        if (options.actionAttributes.onError) {
            options.actionAttributes.onError(resp);
        }
        throw resp;
    };
    Resource.prototype.$setRequestOptionsUrl = function (options) {
        var ro = options.requestOptions;
        if (!ro.url) {
            ro.url =
                options.resolvedOptions.url +
                    options.resolvedOptions.pathPrefix +
                    options.resolvedOptions.path;
        }
        options.usedInPath = {};
        var params = ResourceHelper.defaults(options.actionAttributes.params, options.resolvedOptions.params);
        var pathParams = ro.url.match(/{([^}]*)}/g) || [];
        for (var i = 0; i < pathParams.length; i++) {
            var pathParam = pathParams[i];
            var pathKey = pathParam.substr(1, pathParam.length - 2);
            var isMandatory = pathKey[0] === '!';
            if (isMandatory) {
                pathKey = pathKey.substr(1);
            }
            var onlyPathParam = pathKey[0] === ':';
            if (onlyPathParam) {
                pathKey = pathKey.substr(1);
            }
            if (options.actionAttributes.query && options.actionAttributes.query === options.actionAttributes.params) {
                options.usedInPath[pathKey] = true;
            }
            var value = params[pathKey];
            if (onlyPathParam) {
                delete params[pathKey];
            }
            if (ResourceHelper.isNullOrUndefined(value)) {
                if (isMandatory) {
                    var consoleMsg = "Mandatory " + pathParam + " path parameter is missing";
                    console.warn(consoleMsg);
                    // shell.mainObservable = Observable.create((observer: any) => {
                    //   observer.error(new Error(consoleMsg));
                    // });
                    //
                    //
                    // this.$_releaseMainDeferredSubscriber(shell);
                    throw new Error(consoleMsg);
                }
                ro.url = ro.url.substr(0, ro.url.indexOf(pathParam));
                break;
            }
            // Replacing in the url
            ro.url = ro.url.replace(pathParam, value);
        }
        // Removing double slashed from final url
        ro.url = ro.url.replace(/\/\/+/g, '/');
        if (ro.url.startsWith('http')) {
            ro.url = ro.url.replace(':/', '://');
        }
        // Remove trailing slash
        if (options.actionOptions.removeTrailingSlash) {
            while (ro.url[ro.url.length - 1] === '/') {
                ro.url = ro.url.substr(0, ro.url.length - 1);
            }
        }
    };
    Resource.prototype.$setRequestOptionsBody = function (options) {
        var body = options.actionAttributes.body;
        if (!body) {
            return;
        }
        var realBodyType = ResourceHelper.getRealTypeOf(body);
        var bodyOk = realBodyType === options.actionOptions.requestBodyType;
        if (!bodyOk) {
            if (realBodyType === ResourceRequestBodyType.JSON) {
                if (options.actionOptions.requestBodyType === ResourceRequestBodyType.FORM_DATA) {
                    var newBody_1 = new FormData();
                    Object.keys(body).forEach(function (key) {
                        var value = body[key];
                        if (body.hasOwnProperty(key) && typeof value !== 'function') {
                            var isArrayOfFiles = value instanceof Array && value.reduce(function (acc, elem) { return acc && elem instanceof File; }, true);
                            if (isArrayOfFiles) {
                                value.forEach(function (f, index) {
                                    newBody_1.append(key + "[" + index + "]", f, f.name);
                                });
                            }
                            else if (value instanceof File) {
                                newBody_1.append(key, value, value.name);
                            }
                            else if (!options.actionOptions.rootNode) {
                                newBody_1.append(key, value);
                            }
                        }
                    });
                    if (options.actionOptions.rootNode) {
                        newBody_1.append(options.actionOptions.rootNode, JSON.stringify(body));
                    }
                    body = newBody_1;
                    bodyOk = true;
                }
            }
        }
        if (!bodyOk) {
            throw new Error('Can not convert body');
        }
        if (!(body instanceof FormData)) {
            // Add root node if needed
            if (options.actionOptions.rootNode) {
                var newBody = {};
                newBody[options.actionOptions.rootNode] = body;
                body = newBody;
            }
            if ((options.actionOptions.requestBodyType === ResourceRequestBodyType.NONE ||
                (options.actionOptions.requestBodyType === ResourceRequestBodyType.JSON &&
                    typeof body === 'object' && Object.keys(body).length === 0)) && !options.actionOptions.keepEmptyBody) {
                return;
            }
        }
        options.requestOptions.body = body;
    };
    Resource.prototype.$setRequestOptionsQuery = function (options) {
        var _this = this;
        var oq = options.actionAttributes.query || {};
        if (options.resolvedOptions.query) {
            oq = __assign({}, options.resolvedOptions.query, oq);
        }
        if (oq) {
            options.requestOptions.query = {};
            Object.keys(oq).forEach(function (key) {
                if (oq.hasOwnProperty(key) && !options.usedInPath[key]) {
                    _this.$appendQueryParams(options.requestOptions.query, key, oq[key], options.queryMappingMethod);
                }
            });
        }
        if (options.actionOptions.addTimestamp) {
            options.requestOptions.query = options.requestOptions.query || {};
            this.$appendQueryParams(options.requestOptions.query, options.actionOptions.addTimestamp, Date.now().toString(10), options.queryMappingMethod);
        }
    };
    Resource.prototype.$appendQueryParams = function (query, key, value, queryMappingMethod) {
        if (value instanceof Date) {
            query[key] = value.toISOString();
            return;
        }
        if (typeof value === 'object') {
            switch (queryMappingMethod) {
                case ResourceQueryMappingMethod.Plain:
                    if (Array.isArray(value)) {
                        query[key] = value.join(',');
                        // for (const arrValue of value) {
                        //   query[key] = arrValue;
                        // }
                    }
                    else {
                        if (value && typeof value === 'object') {
                            /// Convert dates to ISO format string
                            if (value instanceof Date) {
                                value = value.toISOString();
                            }
                            else {
                                value = JSON.stringify(value);
                            }
                        }
                        query[key] = value;
                    }
                    return;
                case ResourceQueryMappingMethod.Bracket:
                    /// Convert object and arrays to query params
                    for (var k in value) {
                        if (value.hasOwnProperty(k)) {
                            this.$appendQueryParams(query, key + "[" + k + "]", value[k], queryMappingMethod);
                        }
                    }
                    return;
                case ResourceQueryMappingMethod.JQueryParamsBracket:
                    /// Convert object and arrays to query params according to $.params
                    for (var k in value) {
                        if (value.hasOwnProperty(k)) {
                            var path = key + "[" + k + "]";
                            if (Array.isArray(value) && typeof value[k] !== 'object') {
                                path = key + "[]";
                            }
                            this.$appendQueryParams(query, path, value[k], queryMappingMethod);
                        }
                    }
                    return;
            }
        }
        query[key] = value;
    };
    Resource.prototype.$_setResourceActionInnerDefaults = function (options) {
        var actionOptions = options.actionOptions;
        // Setting default request method
        if (!actionOptions.method) {
            actionOptions.method = ResourceRequestMethod.Get;
        }
        var actionAttributes = options.actionAttributes;
        if (actionAttributes.body) {
            // Setting default request content type
            if (!actionOptions.requestBodyType) {
                actionOptions.requestBodyType = ResourceHelper.getRealTypeOf(actionAttributes.body);
            }
            // Setting params and query if needed
            if (actionOptions.requestBodyType === ResourceRequestBodyType.JSON &&
                typeof actionAttributes.body === 'object' && !Array.isArray(actionAttributes.body)) {
                if (!actionAttributes.params) {
                    actionAttributes.params = actionAttributes.body;
                }
                options.isModel = !!actionAttributes.body.$resource;
            }
        }
        actionAttributes.params = actionAttributes.params || {};
        if (!actionAttributes.query && actionOptions.method === ResourceRequestMethod.Get) {
            actionAttributes.query = actionAttributes.params;
        }
        options.queryMappingMethod = actionOptions.queryMappingMethod || ResourceGlobalConfig.queryMappingMethod;
    };
    Resource.prototype.$_setResourceActionOptionDefaults = function (options) {
        var actionOptions = options.actionOptions;
        if (ResourceHelper.isNullOrUndefined(actionOptions.filter)) {
            actionOptions.filter = this.$filter;
        }
        if (ResourceHelper.isNullOrUndefined(actionOptions.map)) {
            actionOptions.map = this.$map;
        }
        if (ResourceHelper.isNullOrUndefined(actionOptions.resultFactory)) {
            actionOptions.resultFactory = this.$resultFactory;
        }
        if (ResourceHelper.isNullOrUndefined(actionOptions.removeTrailingSlash)) {
            actionOptions.removeTrailingSlash = ResourceGlobalConfig.removeTrailingSlash;
        }
        if (ResourceHelper.isNullOrUndefined(actionOptions.withCredentials)) {
            actionOptions.withCredentials = ResourceGlobalConfig.withCredentials;
        }
        if (ResourceHelper.isNullOrUndefined(actionOptions.asPromise)) {
            actionOptions.asPromise = ResourceGlobalConfig.asPromise;
        }
        if (ResourceHelper.isNullOrUndefined(actionOptions.asResourceResponse)) {
            actionOptions.asResourceResponse = ResourceGlobalConfig.asResourceResponse;
        }
        if (ResourceHelper.isNullOrUndefined(actionOptions.responseBodyType)) {
            actionOptions.responseBodyType = ResourceGlobalConfig.responseBodyType;
        }
        if (ResourceHelper.isNullOrUndefined(actionOptions.lean)) {
            actionOptions.lean = ResourceGlobalConfig.lean;
            if (actionOptions.mutateBody && !actionOptions.asPromise && ResourceHelper.isNullOrUndefined(actionOptions.lean)) {
                actionOptions.lean = true;
            }
        }
        if (ResourceHelper.isNullOrUndefined(actionOptions.addTimestamp)) {
            actionOptions.addTimestamp = ResourceGlobalConfig.addTimestamp;
            if (actionOptions.addTimestamp && typeof actionOptions.addTimestamp !== 'string') {
                actionOptions.addTimestamp = 'ts';
            }
        }
    };
    Resource.prototype.$_setResolvedOptions = function (options) {
        return Promise.all([
            this.$getUrl(options.actionOptions),
            this.$getPathPrefix(options.actionOptions),
            this.$getPath(options.actionOptions),
            this.$getHeaders(options.actionOptions),
            this.$getBody(options.actionOptions),
            this.$getParams(options.actionOptions),
            this.$getQuery(options.actionOptions)
        ])
            .then(function (resolvedMain) {
            options.resolvedOptions = {};
            var r = options.resolvedOptions;
            r.url = resolvedMain[0], r.pathPrefix = resolvedMain[1], r.path = resolvedMain[2], r.headers = resolvedMain[3], r.body = resolvedMain[4], r.params = resolvedMain[5], r.query = resolvedMain[6];
            return options;
        });
    };
    Resource.prototype.$_createRequestOptions = function (options) {
        options.requestOptions = {};
        // Step 1 set main
        options.requestOptions.method = options.actionOptions.method;
        options.requestOptions.headers = options.resolvedOptions.headers;
        options.requestOptions.withCredentials = options.actionOptions.withCredentials;
        options.requestOptions.responseBodyType = options.actionOptions.responseBodyType;
        options.requestOptions.requestBodyType = options.actionOptions.requestBodyType;
        // Step 2 create url
        this.$setRequestOptionsUrl(options);
        // Step 3 create body
        this.$setRequestOptionsBody(options);
        // Step 4 set query params
        this.$setRequestOptionsQuery(options);
        return options;
    };
    Resource.prototype.$_canSetInternalData = function (options) {
        return options.returnData && (!options.actionOptions.lean || options.isModel);
    };
    return Resource;
}());
export { Resource };
