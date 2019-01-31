import { ResourceHelper } from './ResourceHelper';
var ResourceModel = /** @class */ (function () {
    function ResourceModel() {
        this.$resource = null;
        this.$resolved = true;
        this.$promise = null;
    }
    ResourceModel.get = function (id) {
        return this.getInstance()[this.methodGet]({ id: id });
    };
    ResourceModel.query = function (query) {
        return this.getInstance()[this.methodQuery](query);
    };
    ResourceModel.remove = function (id) {
        return this.getInstance()[this.methodRemove]({ id: id });
    };
    ResourceModel.getInstance = function () {
        if (!this.resourceInstance) {
            var model = (new this());
            if (!model.$resource) {
                throw new Error('Your resource is not defined');
            }
            if (!model.$resource.instance) {
                throw new Error('Your resource is not created (inject it somewhere)');
            }
            this.resourceInstance = (new this()).$resource.instance;
        }
        return this.resourceInstance;
    };
    ResourceModel.prototype.$setData = function (data) {
        Object.assign(this, data);
        return this;
    };
    ResourceModel.prototype.$save = function (query, params) {
        if (this.isNew()) {
            return this.$create(query, params);
        }
        else {
            return this.$update(query, params);
        }
    };
    ResourceModel.prototype.$create = function (query, params) {
        return this.$executeResourceMethod(this.constructor.methodCreate, query, params);
    };
    ResourceModel.prototype.$update = function (query, params) {
        return this.$executeResourceMethod(this.constructor.methodUpdate, query, params);
    };
    ResourceModel.prototype.$remove = function (query, params) {
        return this.$executeResourceMethod(this.constructor.methodRemove, query, params);
    };
    ResourceModel.prototype.toJSON = function () {
        return ResourceHelper.cleanData(this);
    };
    ResourceModel.prototype.isNew = function () {
        return !this['id'];
    };
    ResourceModel.prototype.$getResourceWithMethodCheck = function (methodName) {
        if (!this.$resource) {
            console.error("Your Resource is not defined");
            return null;
        }
        var restInstance = this.$resource.instance;
        if (!restInstance) {
            console.error("Your Resource is not defined or not created");
            return null;
        }
        if (!restInstance[methodName]) {
            console.error("Your Resource has no implemented " + methodName + " method.");
            return null;
        }
        return restInstance;
    };
    ResourceModel.prototype.$executeResourceMethod = function (methodName, query, params) {
        var resource = this.$getResourceWithMethodCheck(methodName);
        if (resource) {
            resource[methodName](this, query, params);
        }
        return this;
    };
    ResourceModel.resourceInstance = null;
    ResourceModel.methodQuery = 'query';
    ResourceModel.methodGet = 'get';
    ResourceModel.methodCreate = 'create';
    ResourceModel.methodUpdate = 'update';
    ResourceModel.methodRemove = 'remove';
    return ResourceModel;
}());
export { ResourceModel };
