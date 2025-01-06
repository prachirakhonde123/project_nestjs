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
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
let DatabaseModule = class DatabaseModule {
    constructor(connection) {
        this.connection = connection;
    }
    async onModuleInit() {
        try {
            if (this.connection.readyState === 1) {
                console.log('MongoDB is connected.');
            }
            this.connection.on('connected', () => {
                console.log('MongoDB connected successfully');
            });
            this.connection.on('error', (err) => {
                console.error('Error connecting to MongoDB:', err);
            });
            this.connection.on('disconnected', () => {
                console.log('MongoDB disconnected');
            });
        }
        catch (err) {
            console.log('Error during MongoDB connection lifecycle:', err);
        }
    }
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGO_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    }),
    __param(0, (0, mongoose_3.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection])
], DatabaseModule);
//# sourceMappingURL=database.module.js.map