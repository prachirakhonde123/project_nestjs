import { Controller, Post, Body, Req, UnauthorizedException, Get, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor (private readonly authService : AuthService) {}

    @Get('protected')
    getProtectedRoute(@Request() req) {
        console.log('req user is...',req.user)
        if (!req.user) {
        throw new UnauthorizedException('User not authorized');
        }

        return {
            message: 'This is a protected route',
            user: req.user, // User data attached to the request by the middleware
        };
    }    

    @Post('login')
    async login(@Body() user : {username : string, password : string}){
        let getUser = await this.authService.validateUser(user.username, user.password);
        console.log('getUser iss....',getUser)
        if(getUser){
            const loginResponse = await this.authService.login(getUser);
            return loginResponse;
            // this.authService.login;
        }
        else{
            return {
                status : false,
                message : 'Invalid Credentials'
            }
        }
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    logout(@Req() req: any) {
     console.log('req user is...',req.user)
      req.user = null; 
      return { message: 'Logged out successfully' };
    }
}