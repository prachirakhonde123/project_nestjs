import { Model } from "mongoose";
import { User } from "src/user/user.schema";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    decodeToken1(token: string): {
        exp: number;
    } | {
        status: boolean;
        message: string;
    };
    decodeToken(token: string): any;
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        data: {
            username: any;
            email: any;
        };
    }>;
}
