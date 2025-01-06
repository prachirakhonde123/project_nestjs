"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextToVoiceController = void 0;
const common_1 = require("@nestjs/common");
const texttovoice_service_1 = require("./texttovoice.service");
const fs = require("fs");
let TextToVoiceController = class TextToVoiceController {
    constructor(textToVoiceService) {
        this.textToVoiceService = textToVoiceService;
    }
    async convert(text, res) {
        try {
            console.log('text is..', text);
            const result = await this.textToVoiceService.convertTextToVoice(text);
            res.sendFile(result, { root: '.' }, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error generating voice file');
                }
                else {
                    fs.unlink(result, (unlinkErr) => {
                        if (unlinkErr)
                            console.error(`Failed to delete file: ${result}`);
                    });
                }
            });
        }
        catch (error) {
            res.status(500).send('An error occurred while processing the request');
        }
    }
};
exports.TextToVoiceController = TextToVoiceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('text')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TextToVoiceController.prototype, "convert", null);
exports.TextToVoiceController = TextToVoiceController = __decorate([
    (0, common_1.Controller)('text-to-voice'),
    __metadata("design:paramtypes", [texttovoice_service_1.TextToVoiceService])
], TextToVoiceController);
//# sourceMappingURL=texttovoice.controller.js.map