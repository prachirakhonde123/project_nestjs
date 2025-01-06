import { Module, NestModule, MiddlewareConsumer,forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from './user.schema'; // Import the UserModel
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        
        forwardRef(() => AuthModule), // Resolving circular dependency
          
        // Register the User schema with MongooseModule
        MongooseModule.forFeature([{ name: 'User', schema: UserModel.schema }]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports : [UserService,MongooseModule]
})
// export class UserModule implements NestModule {
//     configure(consumer: MiddlewareConsumer) {
//         consumer
//             .apply(AuthMiddleware)
//             .forRoutes('users');  // Apply middleware to the users routes
//     }
// }
export class UserModule{}