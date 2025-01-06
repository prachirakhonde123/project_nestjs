import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getProtectedRoute(req: any): {
        message: string;
        user: any;
    };
    login(user: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
        data: {
            username: any;
            email: any;
        };
    } | {
        status: boolean;
        message: string;
    }>;
    logout(req: any): {
        message: string;
    };
}
