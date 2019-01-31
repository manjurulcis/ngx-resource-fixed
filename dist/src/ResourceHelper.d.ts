import { ResourceRequestBodyType } from './Declarations';
export declare class ResourceHelper {
    static cleanDataFields: string[];
    private static isBrowser;
    static isRunningInBrowser(): boolean;
    static getRealTypeOf(data: any): ResourceRequestBodyType;
    static defaults(dst: any, src: any): any;
    static isNullOrUndefined(value: any): boolean;
    static cleanData(obj: any): any;
    static cleanDataArray(obj: any[]): any[];
    static cleanDataObject(obj: any): any;
}
