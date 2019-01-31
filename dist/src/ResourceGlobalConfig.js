import { ResourceQueryMappingMethod, ResourceResponseBodyType } from './Declarations';
var ResourceGlobalConfig = /** @class */ (function () {
    function ResourceGlobalConfig() {
    }
    ResourceGlobalConfig.url = null;
    ResourceGlobalConfig.pathPrefix = null;
    ResourceGlobalConfig.path = null;
    ResourceGlobalConfig.headers = null;
    ResourceGlobalConfig.body = null;
    ResourceGlobalConfig.params = null;
    ResourceGlobalConfig.query = null;
    ResourceGlobalConfig.removeTrailingSlash = true;
    ResourceGlobalConfig.addTimestamp = false;
    ResourceGlobalConfig.withCredentials = false;
    ResourceGlobalConfig.lean = null;
    ResourceGlobalConfig.asPromise = true;
    // static toObservable: boolean = null;
    ResourceGlobalConfig.asResourceResponse = false;
    ResourceGlobalConfig.responseBodyType = ResourceResponseBodyType.Json;
    ResourceGlobalConfig.queryMappingMethod = ResourceQueryMappingMethod.Plain;
    return ResourceGlobalConfig;
}());
export { ResourceGlobalConfig };
