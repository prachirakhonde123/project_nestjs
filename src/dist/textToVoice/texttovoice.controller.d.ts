import { TextToVoiceService } from "./texttovoice.service";
import { Response } from "express";
export declare class TextToVoiceController {
    private readonly textToVoiceService;
    constructor(textToVoiceService: TextToVoiceService);
    convert(text: string, res: Response): Promise<void>;
}
