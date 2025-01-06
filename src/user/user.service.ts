import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema'; // Import User interface
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    private readonly usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;

    constructor(
        @InjectModel('User') private readonly userModel: Model<User> // Use Model<User> instead of Model<UserModule>
    ) {}
    
    async getUsers():Promise<any>{
        try{
            let userData = await this.userModel.find().lean();
            // console.log('userdata is...',userData);
            
            if(userData.length>0){
                return {
                    status : true,
                    data : userData
                }
            }else{
                return {
                    status : true,
                    data : "No users found"
                }
            }
        }
        catch(error){
            return {
                status : false,
                message : error.message
            }

        }
    }

    // Return type with status, message, and optional data or error
    async createUser(userData: Record<string, any>): Promise<{ status: boolean; message: string; data?: Record<string, any>; error?: string }> {
        try {
            // Validate username format
            if (!this.usernameRegex.test(userData.username)) {
                return {
                    status: false,
                    message: 'Invalid username format. It should be 3-20 characters long and can only contain letters, numbers, underscores, or hyphens.'
                };
            }

            // Create the user
            let userId = uuidv4();
            userData._id = userId
            const newUser = await this.userModel.create(userData);
            console.log('newUser is......',newUser)
            // const newUser = new this.userModel(userData);
            // await newUser.save();

            return {
                status: true,
                message: 'User added successfully',
                data: newUser // Return the newly created user
            };
        } catch (err) {
            return {
                status: false,
                message: 'Error occurred while adding user',
                error: err.message || 'An unknown error occurred'
            };
        }
    }
}
