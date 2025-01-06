import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    private readonly saltRounds = 10; // Adjust as per your security requirements

    @Post('createUser')
    async createUser(@Body() userData: Record<string, any>) {
        try {
            const { username, password, email } = userData;

            // Input validation
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

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, this.saltRounds);
            userData.password = hashedPassword;

            // Create the user via service
            console.log('user1234567........',userData)
            return await this.userService.createUser(userData);

        } catch (error) {
            return {
                status: false,
                message: error.message || 'An unexpected error occurred'
            };
        }
    }

    @Get('getUser')
    @UseGuards(JwtAuthGuard)
    async getUser(){
        let user_data = await this.userService.getUsers();
        // console.log('data is....1234',user_data);
        
        return {
            data : user_data
        }

    }
}
