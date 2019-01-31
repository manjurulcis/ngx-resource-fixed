var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { ResourceRequestMethod } from './Declarations';
export function ResourceAction(methodOptions) {
    methodOptions = methodOptions || {};
    if (methodOptions.method === undefined) {
        methodOptions.method = ResourceRequestMethod.Get;
    }
    return function (target, propertyKey) {
        target[propertyKey] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var callbacks = args.filter(function (arg) { return typeof arg === 'function'; });
            var data = args.filter(function (arg) { return typeof arg !== 'function'; });
            var body = data[0];
            var query = data[1];
            var params = data[2];
            var onSuccess = callbacks[0];
            var onError = callbacks[1];
            //tslint:disable-next-line:no-invalid-this
            var actionOptions = __assign({}, this.getResourceOptions(), methodOptions);
            //tslint:disable-next-line:no-invalid-this
            return this.$restAction({ actionAttributes: { body: body, query: query, params: params, onSuccess: onSuccess, onError: onError }, actionOptions: actionOptions });
        };
    };
}
