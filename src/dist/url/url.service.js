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
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const mongoose_2 = require("@nestjs/mongoose");
const shortid = require("shortid");
let UrlService = class UrlService {
    constructor(urlModel) {
        this.urlModel = urlModel;
    }
    async generateShortUrl(urlData) {
        try {
            let longurl = urlData.url;
            let BASEURL = 'localhost:4000';
            let checkDuplicate = await this.urlModel.findOne({ longUrl: longurl });
            if (checkDuplicate) {
                return {
                    status: false,
                    message: 'LongUrl is already stored in Db'
                };
            }
            let shortId = shortid.generate();
            let checkId = await this.urlModel.findOne({ shortId: shortId });
            if (checkId) {
                return {
                    status: false,
                    message: 'Duplicate Url'
                };
            }
            let shortUrl = BASEURL + '/' + shortId;
            let url_data = {
                _id: (0, uuid_1.v4)(),
                url: longurl,
                shortId: shortId
            };
            console.log('data is....', url_data);
            let createData = await this.urlModel.create(url_data);
            return {
                status: true,
                data: createData,
                shortUrl: shortUrl
            };
        }
        catch (err) {
            return {
                status: false,
                message: err.message
            };
        }
    }
    async getUrl(shortid) {
        const urlRecord = await this.urlModel.findOne({ shortId: shortid }).lean();
        if (!urlRecord) {
            throw new common_1.NotFoundException('No URL found for the provided shortid');
        }
        return {
            status: true,
            data: urlRecord.url
        };
    }
    async getAllUrl() {
        try {
            let getData = await this.urlModel.find().lean();
            if (getData.length > 0) {
                return {
                    status: true,
                    data: getData
                };
            }
            else {
                return {
                    status: false,
                    data: []
                };
            }
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
            let { url, shortId } = newData;
            let updatedata = {
                url: url,
                shortId: shortId
            };
            let updateData = await this.urlModel.findOneAndUpdate({ _id: id }, { $set: updatedata });
            return {
                status: true,
                message: 'Data Updated'
            };
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Internal Server Error');
        }
    }
};
exports.UrlService = UrlService;
exports.UrlService = UrlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Url')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UrlService);
//# sourceMappingURL=url.service.js.map