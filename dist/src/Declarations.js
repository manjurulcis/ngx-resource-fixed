export var ResourceRequestBodyType;
(function (ResourceRequestBodyType) {
    ResourceRequestBodyType[ResourceRequestBodyType["NONE"] = 0] = "NONE";
    ResourceRequestBodyType[ResourceRequestBodyType["JSON"] = 1] = "JSON";
    ResourceRequestBodyType[ResourceRequestBodyType["FORM"] = 2] = "FORM";
    ResourceRequestBodyType[ResourceRequestBodyType["FORM_DATA"] = 3] = "FORM_DATA";
    ResourceRequestBodyType[ResourceRequestBodyType["TEXT"] = 4] = "TEXT";
    ResourceRequestBodyType[ResourceRequestBodyType["BLOB"] = 5] = "BLOB";
    ResourceRequestBodyType[ResourceRequestBodyType["ARRAY_BUFFER"] = 6] = "ARRAY_BUFFER";
})(ResourceRequestBodyType || (ResourceRequestBodyType = {}));
export var ResourceResponseBodyType;
(function (ResourceResponseBodyType) {
    ResourceResponseBodyType[ResourceResponseBodyType["Text"] = 1] = "Text";
    ResourceResponseBodyType[ResourceResponseBodyType["Json"] = 2] = "Json";
    ResourceResponseBodyType[ResourceResponseBodyType["ArrayBuffer"] = 3] = "ArrayBuffer";
    ResourceResponseBodyType[ResourceResponseBodyType["Blob"] = 4] = "Blob";
})(ResourceResponseBodyType || (ResourceResponseBodyType = {}));
export var ResourceRequestMethod;
(function (ResourceRequestMethod) {
    ResourceRequestMethod[ResourceRequestMethod["Get"] = 1] = "Get";
    ResourceRequestMethod[ResourceRequestMethod["Post"] = 2] = "Post";
    ResourceRequestMethod[ResourceRequestMethod["Put"] = 3] = "Put";
    ResourceRequestMethod[ResourceRequestMethod["Delete"] = 4] = "Delete";
    ResourceRequestMethod[ResourceRequestMethod["Options"] = 5] = "Options";
    ResourceRequestMethod[ResourceRequestMethod["Head"] = 6] = "Head";
    ResourceRequestMethod[ResourceRequestMethod["Patch"] = 7] = "Patch";
})(ResourceRequestMethod || (ResourceRequestMethod = {}));
export var ResourceQueryMappingMethod;
(function (ResourceQueryMappingMethod) {
    ResourceQueryMappingMethod[ResourceQueryMappingMethod["Plain"] = 1] = "Plain";
    ResourceQueryMappingMethod[ResourceQueryMappingMethod["Bracket"] = 2] = "Bracket";
    ResourceQueryMappingMethod[ResourceQueryMappingMethod["JQueryParamsBracket"] = 3] = "JQueryParamsBracket";
    ResourceQueryMappingMethod[ResourceQueryMappingMethod["None"] = 99] = "None";
})(ResourceQueryMappingMethod || (ResourceQueryMappingMethod = {}));
