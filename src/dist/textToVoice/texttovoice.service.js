"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextToVoiceService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const child_process_1 = require("child_process");
const util_1 = require("util");
let TextToVoiceService = class TextToVoiceService {
    async convertTextToVoice(text) {
        console.log('text is...', text);
        const outputDir = './output';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }
        const fileName = `voice-${Date.now()}.mp3`;
        const pathName = `${outputDir}/${fileName}`;
        const ttsCommand = `espeak "${text}" --stdout | ffmpeg -i - -f mp3 ${pathName}`;
        const execPromise = (0, util_1.promisify)(child_process_1.exec);
        try {
            await execPromise(ttsCommand);
            return pathName;
        }
        catch (err) {
            console.error('Error executing text-to-speech:', err);
            throw new Error('Text-to-speech conversion failed');
        }
    }
};
exports.TextToVoiceService = TextToVoiceService;
exports.TextToVoiceService = TextToVoiceService = __decorate([
    (0, common_1.Injectable)()
], TextToVoiceService);
//# sourceMappingURL=texttovoice.service.js.map