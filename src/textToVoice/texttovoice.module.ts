import { Module } from "@nestjs/common";
import { TextToVoiceController } from "./texttovoice.controller";
import { TextToVoiceService } from "./texttovoice.service";

@Module({
    imports : [],
    controllers : [TextToVoiceController],
    providers : [TextToVoiceService]
})

export class TextToVoiceModule{}