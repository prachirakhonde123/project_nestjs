import { Injectable, UnauthorizedException, NestMiddleware} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor (private readonly authService : AuthService) {}

    use(req:Request,res:Response,next:NextFunction){
        console.log('triggered')
        const header = req.headers['x-access-token'] as string;
        // console.log('header',header)
        if (!header || header === undefined) {
            return res.status(401).json({
              status: false,
              message: "Token Required",
            });
        }

        try{
            const decoded = this.authService.decodeToken(header); // Decode and check expiry
            if (decoded.status === false) {
                // If the token is expired or invalid
                return res.status(401).json(decoded); // Send custom response directly
            }
            req['user'] = decoded;
            next()
        }
        catch(error){
            throw new UnauthorizedException('Invalid Token or Token expired')

        }
    }
}



/*
NOTES:
export class AuthMiddleware implements NestMiddleware:-

export: This makes the class available for import in other modules. 
For example, you might import it in your AppModule or a feature module to use it.

class AuthMiddleware: Declares a class named AuthMiddleware. This class encapsulates
the functionality of the middleware.

implements: This is a TypeScript keyword that ensures the class follows the contract
 of a given interface.

NestMiddleware: This is an interface provided by NestJS. It defines a specific 
structure for middleware classes that work seamlessly within the NestJS framework.

*/