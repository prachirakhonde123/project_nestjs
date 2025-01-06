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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
        this.usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    }
    async getUsers() {
        try {
            let userData = await this.userModel.find().lean();
            if (userData.length > 0) {
                return {
                    status: true,
                    data: userData
                };
            }
            else {
                return {
                    status: true,
                    data: "No users found"
                };
            }
        }
        catch (error) {
            return {
                status: false,
                message: error.message
            };
        }
    }
    async createUser(userData) {
        try {
            if (!this.usernameRegex.test(userData.username)) {
                return {
                    status: false,
                    message: 'Invalid username format. It should be 3-20 characters long and can only contain letters, numbers, underscores, or hyphens.'
                };
            }
            let userId = (0, uuid_1.v4)();
            userData._id = userId;
            const newUser = await this.userModel.create(userData);
            console.log('newUser is......', newUser);
            return {
                status: true,
                message: 'User added successfully',
                data: newUser
            };
        }
        catch (err) {
            return {
                status: false,
                message: 'Error occurred while adding user',
                error: err.message || 'An unknown error occurred'
            };
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map