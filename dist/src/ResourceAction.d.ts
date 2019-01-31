import { Resource } from './Resource';
import { IResourceAction } from './Declarations';
export declare function ResourceAction(methodOptions?: IResourceAction): (target: Resource, propertyKey: string) => void;
