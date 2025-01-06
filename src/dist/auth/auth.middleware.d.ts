import { NestMiddleware } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response, NextFunction } from "express";
export declare class AuthMiddleware implements NestMiddleware {
    private readonly authService;
    constructor(authService: AuthService);
    use(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
}
