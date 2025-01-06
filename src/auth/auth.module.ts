import { Module, NestModule, MiddlewareConsumer,forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthMiddleware } from './auth.middleware';
import { UserModule } from 'src/user/user.module';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with a strong secret
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,JwtAuthGuard],
  exports : [AuthService]
})
export class AuthModule implements NestModule {
    // Apply middleware to routes
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes('users/getUser'); // Apply only to protected routes in the auth module
    }
  }
