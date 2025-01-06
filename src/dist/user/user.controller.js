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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const bcrypt = require("bcryptjs");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.saltRounds = 10;
    }
    async createUser(userData) {
        try {
            const { username, password, email } = userData;
            if (!username || username.length === 0) {
                return {
                    status: false,
                    message: 'Username is Required'
                };
            }
            if (!password || password.length < 8) {
                return {
                    status: false,
                    message: 'Password must be at least 8 characters long'
                };
            }
            if (!email || email.length === 0) {
                return {
                    status: false,
                    message: 'Email is Required'
                };
            }
            const hashedPassword = await bcrypt.hash(password, this.saltRounds);
            userData.password = hashedPassword;
            console.log('user1234567........', userData);
            return await this.userService.createUser(userData);
        }
        catch (error) {
            return {
                status: false,
                message: error.message || 'An unexpected error occurred'
            };
        }
    }
    async getUser() {
        let user_data = await this.userService.getUsers();
        return {
            data: user_data
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('createUser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('getUser'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map