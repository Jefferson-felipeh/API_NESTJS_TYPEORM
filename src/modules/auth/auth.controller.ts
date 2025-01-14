import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto, BodyAuthLogin } from 'src/tdos/authDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly service:AuthService){}

    @Post('login')
    async signInUser(@Body() dataBody:BodyAuthLogin):Promise<AuthDto>{
        return (await this.service.signInUser(dataBody));
    }
}
