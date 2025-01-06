import { UrlService } from "./url.service";
import { Response } from "express";
export declare class UrlController {
    private readonly urlService;
    constructor(urlService: UrlService);
    generateShortUrl(urlData: Record<string, any>): Promise<any>;
    getUrl(shortid: string, res: Response): Promise<void>;
    getAllData(): Promise<{
        status: boolean;
        data: any;
        message?: undefined;
    } | {
        status: boolean;
        message: any;
        data?: undefined;
    }>;
    updateUrl(newData: Record<string, any>, id: string): Promise<{
        status: boolean;
        message: string;
    }>;
}
