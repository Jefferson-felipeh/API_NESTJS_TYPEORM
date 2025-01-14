import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAccount } from './entities/CreateAccount';
import { CreateAccountModule } from './modules/create-account/create-account.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config:ConfigService) => ({
        type: config.get<'sqlite'>('TYPEORM_CONNECTION'),
        database: 'database.sqlite',
        entities: [CreateAccount],
        synchronize: true
      }),
    }),
    CreateAccountModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
