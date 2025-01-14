import { Module } from '@nestjs/common';
import { CreateAccountService } from './create-account.service';
import { CreateAccountController } from './create-account.controller';
import { CreateAccount } from 'src/entities/CreateAccount';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CreateAccount]),
  ],
  exports: [CreateAccountService],
  providers: [CreateAccountService],
  controllers: [CreateAccountController]
})
export class CreateAccountModule {}
