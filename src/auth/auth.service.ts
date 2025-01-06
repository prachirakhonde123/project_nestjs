import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcryptjs'
import { Model } from "mongoose";
import { User } from "src/user/user.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
     @InjectModel('User') private readonly userModel : Model<User>, // Injecting the User model
     private readonly jwtService : JwtService
    ) {}

    decodeToken1(token : string){
        try{
            const decodeToken = this.jwtService.decode(token) as {exp : number}
            console.log('decode token',decodeToken)
            if(!decodeToken){
                return {
                    status : false,
                    message : 'Invalid Token'
                }
            }

            let currentTime = Math.floor(Date.now()/1000)
            console.log('currenttime is..',currentTime)
            if(currentTime > decodeToken.exp){
               return {
                  status : false,
                  message : 'Token Expired!'
               }
            }
            
            console.log('decode token is...',decodeToken);
            
            return decodeToken
        }
        catch(err){
            throw new UnauthorizedException('Failed to decode token');
        }

    }

    decodeToken(token:string){
        try{
            const decoded = this.jwtService.verify(token);
            
            console.log('Decoded token:', decoded);
        
            return decoded;

        }
        catch(err){
            if (err.name === 'TokenExpiredError') {
                return {
                  status: false,
                  message: 'Token Expired!',
            };
          }
        }
        return {
            status: false,
            message: 'Invalid Token',
        };

    }

    async validateUser(username: string, password: string): Promise<any>{
        let findUser = await this.userModel.findOne({username : username})
        // console.log('findUser is...',findUser)
        if(!findUser){
            return {
                status : false,
                message : 'No User Found || Unauthorised User'
            }
        }

        let validUser = await bcrypt.compare(password, findUser.password)
        // console.log('validUser is...',validUser)
        if(validUser){
            const { password, ...result } = findUser.toObject();
            console.log('result is...',result);
            return result;
        }
        
        return {
            status : false,
            message : 'Unauthorised User'
        }
    }

    async login(user : any){
        // console.log('logini2345678',user)
        const payload = {username : user.username, email : user.email}
        let token = this.jwtService.sign(payload)
        return {
            access_token : token,
            data : payload
        }
    }
}
