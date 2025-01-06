import { Model } from 'mongoose';
import { User } from './user.schema';
export declare class UserService {
    private readonly userModel;
    private readonly usernameRegex;
    constructor(userModel: Model<User>);
    getUsers(): Promise<any>;
    createUser(userData: Record<string, any>): Promise<{
        status: boolean;
        message: string;
        data?: Record<string, any>;
        error?: string;
    }>;
}
