import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    private readonly saltRounds;
    createUser(userData: Record<string, any>): Promise<{
        status: boolean;
        message: string;
        data?: Record<string, any>;
        error?: string;
    } | {
        status: boolean;
        message: any;
    }>;
    getUser(): Promise<{
        data: any;
    }>;
}
