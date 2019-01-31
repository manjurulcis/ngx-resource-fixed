import { IResourceHandlerResponse, IResourceRequest } from './Declarations';
export declare abstract class ResourceHandler {
    abstract handle(req: IResourceRequest): IResourceHandlerResponse;
}
