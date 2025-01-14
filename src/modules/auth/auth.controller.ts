import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto, BodyAuthLogin } from 'src/tdos/authDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly service:AuthService){}

    //Endpoint que esta pegando os dados do corpo da requisição, e chamando o método do service do modulo_
    @Post('login')
    async signInUser(@Body() dataBody:BodyAuthLogin):Promise<AuthDto>{
        return (await this.service.signInUser(dataBody));
    }
}
