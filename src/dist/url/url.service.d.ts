import { Url } from "./url.schema";
import { Model } from "mongoose";
export declare class UrlService {
    private readonly urlModel;
    constructor(urlModel: Model<Url>);
    generateShortUrl(urlData: Record<string, any>): Promise<any>;
    getUrl(shortid: string): Promise<any>;
    getAllUrl(): Promise<any>;
    updateUrl(newData: Record<string, any>, id: string): Promise<any>;
}
