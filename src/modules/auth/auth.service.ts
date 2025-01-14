import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDto, BodyAuthLogin } from 'src/tdos/authDto';
import { CreateAccountService } from '../create-account/create-account.service';
import { compareSync as bCryptComparePassword } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    acess_variables:number;

    constructor(
        private readonly createAccountService:CreateAccountService,
        private readonly jwtService:JwtService,
        private readonly configService:ConfigService
    ){
        this.acess_variables = +this.configService.get<number>('JWT_EXPIRATION_TIME');
    }

    signInUser = async (dataBody:BodyAuthLogin):Promise<AuthDto> => {
        try{
            const dataAuth = await this.createAccountService.getOneUser(dataBody);
            
            if(!dataAuth) throw new NotFoundException('Erro ao encontrar dados para autenticação!');
    
            const comparePassword = bCryptComparePassword(dataBody.password,dataAuth.password);
    
            if(!comparePassword) throw new UnauthorizedException();
    
            const payload = {sub: dataAuth.id,email:dataAuth.email};
    
            const token = this.jwtService.sign(
                payload, 
                {expiresIn: this.acess_variables}
            );
    
            return {
                token: token,
                expiresIn: this.acess_variables
            }
        }catch(error){
            console.log(error);
        }
    }
}
