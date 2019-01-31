import { ResourceRequestBodyType } from './Declarations';
var ResourceHelper = /** @class */ (function () {
    function ResourceHelper() {
    }
    ResourceHelper.isRunningInBrowser = function () {
        if (this.isBrowser !== null) {
            return this.isBrowser;
        }
        try {
            this.isBrowser = !!window;
        }
        catch (e) {
            this.isBrowser = false;
        }
        return this.isBrowser;
    };
    ResourceHelper.getRealTypeOf = function (data) {
        if (!data) {
            return ResourceRequestBodyType.NONE;
        }
        if (this.isRunningInBrowser()) {
            if (FormData && data instanceof FormData) {
                return ResourceRequestBodyType.FORM_DATA;
            }
            if (Blob && data instanceof Blob) {
                return ResourceRequestBodyType.BLOB;
            }
        }
        if (data instanceof ArrayBuffer) {
            return ResourceRequestBodyType.ARRAY_BUFFER;
        }
        if (['string', 'number'].indexOf(typeof data) > -1) {
            return ResourceRequestBodyType.TEXT;
        }
        return ResourceRequestBodyType.JSON;
    };
    ResourceHelper.defaults = function (dst, src) {
        if (!dst) {
            dst = {};
        }
        Object.keys(src)
            .forEach(function (key) {
            if (dst[key] === undefined) {
                dst[key] = src[key];
            }
        });
        return dst;
    };
    ResourceHelper.isNullOrUndefined = function (value) {
        return value === null || value === undefined;
    };
    ResourceHelper.cleanData = function (obj) {
        if (Array.isArray(obj)) {
            return this.cleanDataArray(obj);
        }
        else {
            return this.cleanDataObject(obj);
        }
    };
    ResourceHelper.cleanDataArray = function (obj) {
        for (var propName in obj) {
            if (typeof obj[propName] === 'function' || this.cleanDataFields.indexOf(propName) > -1) {
                delete obj[propName];
            }
        }
        return obj;
    };
    ResourceHelper.cleanDataObject = function (obj) {
        var cleanedObj = {};
        for (var propName in obj) {
            if (typeof obj[propName] !== 'function' && this.cleanDataFields.indexOf(propName) === -1) {
                cleanedObj[propName] = obj[propName];
            }
        }
        return cleanedObj;
    };
    ResourceHelper.cleanDataFields = [
        '$resolved',
        '$promise',
        '$abort',
        '$resource'
    ];
    ResourceHelper.isBrowser = null;
    return ResourceHelper;
}());
export { ResourceHelper };
