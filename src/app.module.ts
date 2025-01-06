import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UrlModule } from './url/url.module';
import { TextToVoiceModule } from './textToVoice/texttovoice.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, UserModule,UrlModule,TextToVoiceModule, AuthModule,JwtModule.register({
    secret: 'your-secret-key', // Or use environment variable for secret
    signOptions: { expiresIn: '1h' }, // Token expiry
  }), 
  ConfigModule.forRoot({isGlobal:true})
],
  controllers: [AppController,AuthController],
  providers: [AppService,AuthService],
})
export class AppModule {}
