import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CreateAccountModule } from '../create-account/create-account.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [],
      inject: [ConfigService],
      useFactory: (config:ConfigService) => ({
        secret: config.get<string>('JWT_KEY_SECRET'),
        signOptions: {expiresIn: +config.get<number>('JWT_EXPIRATION_TIME')}
      })
    }),

    CreateAccountModule,
    
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
