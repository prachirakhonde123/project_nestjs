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
exports.UrlController = void 0;
const common_1 = require("@nestjs/common");
const url_service_1 = require("./url.service");
let UrlController = class UrlController {
    constructor(urlService) {
        this.urlService = urlService;
    }
    async generateShortUrl(urlData) {
        try {
            let getData = await this.urlService.generateShortUrl(urlData);
            return {
                status: true,
                data: getData
            };
        }
        catch (err) {
            return {
                status: false,
                message: err.message
            };
        }
    }
    async getUrl(shortid, res) {
        if (!shortid) {
            throw new common_1.BadRequestException('Invalid Request: Missing shortid');
        }
        const urlData = await this.urlService.getUrl(shortid);
        if (!urlData) {
            throw new common_1.NotFoundException('URL not found');
        }
        res.setHeader('Cache-Control', 'no-store');
        res.status(200).json({
            status: true,
            data: urlData.data,
        });
    }
    async getAllData() {
        try {
            let getData = await this.urlService.getAllUrl();
            return {
                status: true,
                data: getData
            };
        }
        catch (err) {
            return {
                status: false,
                message: err.message
            };
        }
    }
    async updateUrl(newData, id) {
        try {
            if (!id) {
                return {
                    status: false,
                    message: 'Invalid Request'
                };
            }
            let updateData = await this.urlService.updateUrl(newData, id);
            return {
                status: true,
                message: 'Data updated'
            };
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Internal Server Error');
        }
    }
};
exports.UrlController = UrlController;
__decorate([
    (0, common_1.Post)('create-shorturl'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "generateShortUrl", null);
__decorate([
    (0, common_1.Get)(':shortid'),
    __param(0, (0, common_1.Param)('shortid')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "getUrl", null);
__decorate([
    (0, common_1.Get)('get/fetchUrls'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "getAllData", null);
__decorate([
    (0, common_1.Post)('update/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "updateUrl", null);
exports.UrlController = UrlController = __decorate([
    (0, common_1.Controller)('url'),
    __metadata("design:paramtypes", [url_service_1.UrlService])
], UrlController);
//# sourceMappingURL=url.controller.js.map