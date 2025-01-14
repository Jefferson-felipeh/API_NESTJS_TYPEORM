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
        //Injetando o CreateAcountService para buscar pelo usuário apartir do seu email_
        private readonly createAccountService:CreateAccountService,
        //Injetando o JwtService para criação do token_
        private readonly jwtService:JwtService,
        //Injetando o ConfigService para ter acesso as variaveis globais do arquivo .env_
        private readonly configService:ConfigService
    ){
        //Armazenando os valores da variavel global do .env em uma variavel, para ser utilizado e especificado nesse service_
        this.acess_variables = +this.configService.get<number>('JWT_EXPIRATION_TIME');
    }

    //Criando o token de autenticação, apartir dos dados de login_
    signInUser = async (dataBody:BodyAuthLogin):Promise<AuthDto> => {
        try{
            //Verificando se há um usuário com esses registros especificado no endpoint ao fazer requisição_
            const dataAuth = await this.createAccountService.getOneUser(dataBody);
            if(!dataAuth) throw new NotFoundException('Erro ao encontrar dados para autenticação!');
    
            //Verificando se ambas as senhas estão corretas_
            const comparePassword = bCryptComparePassword(dataBody.password,dataAuth.password);
            if(!comparePassword) throw new UnauthorizedException();
    
            //Criando o payload apartir da informação do id e email do usuário_
            const payload = {sub: dataAuth.id,email:dataAuth.email};
    
            //Criando o token de autenticação_
            const token = this.jwtService.sign(
                payload, 
                {expiresIn: this.acess_variables}
            );
    
            //Retornando para que fizer a chamada desssa função, o token e o expiresIn_
            return {
                token: token,
                expiresIn: this.acess_variables
            }
        }catch(error){
            console.log(error);
        }
    }
}
