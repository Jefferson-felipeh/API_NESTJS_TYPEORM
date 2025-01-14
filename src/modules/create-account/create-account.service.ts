import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccount } from 'src/entities/CreateAccount';
import { AccountDto } from 'src/tdos/CreateAccountDto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { genSaltSync as saltBcrypt } from 'bcrypt';
import { hashSync as hashBcrypt } from 'bcrypt';

@Injectable()
export class CreateAccountService {
    constructor(
        @InjectRepository(CreateAccount)
        private readonly repository: Repository<CreateAccount>
    ){}

    //Criando um novo registro_
    create = async (dataBody:AccountDto):Promise<AccountDto> => {

        if(!dataBody){
            throw new HttpException('Erro, dados inválidos!',400);
        }

        const verifyEmail = await this.repository.findOne({
            where: {
                email: dataBody.email
            }
        });

        if(verifyEmail) throw new HttpException('Email já cadastrado no sistema',400);

        try{

            const saltPassword = saltBcrypt(10);

            const hashPassword = hashBcrypt(dataBody.password, saltPassword);

            const data = await this.repository.create({
                id: dataBody.id,
                name: dataBody.name,
                email: dataBody.email,
                age:dataBody.age,
                password: hashPassword,
                createdOn: dataBody.createdOn,
                updatedOn: dataBody.updatedOn
            });
            return (await this.repository.save(data));
        }catch(error){
            throw new HttpException('Error ao cadastrar dados!',401)
        }
    }

    //Listando dados com base em consultas_
    findAllQuery = async (data:Partial<AccountDto>):Promise<AccountDto[]> => {
        try{
            return (await this.repository.find()).filter((t) => {
                let validatorValue = false;
    
                if(data.name !== undefined && t.name.toLocaleLowerCase().includes(data.name.toLocaleLowerCase())) validatorValue = true;
    
                return validatorValue;
            });
        }catch(error){
            throw new HttpException('Erro ao buscar usuário!',400);
        }
    }

    //Listando todos os dados_
    findAll = async ():Promise<AccountDto[]> =>{
        return (await this.repository.find());
    }

    //Removendo dados por meio de um identificador específico_
    deleteData = async (dataDelete:Partial<AccountDto>):Promise<DeleteResult> => {
        const verifyData = this.repository.findOne({
            where: {
                id: dataDelete.id
            }
        });

        if(!verifyData) throw new HttpException('Erro ao encontrar dado para deletar!',400);

        try{
            return (await this.repository.delete(dataDelete));
        }catch(error){
            console.log(error);
        }
    }

    //Atualizando dados do banco de acordo com um identificador específico_
    update = async (id:Partial<AccountDto>, dataBodyUpdate:AccountDto):Promise<UpdateResult> => {
        const verifyUpdate = this.repository.findOne({
            where: {
                id: id.id
            }
        });

        if(!verifyUpdate) throw new HttpException('Erro ao encontrar dados para atualizar!',400);

        try{
            return (await this.repository.update(id,dataBodyUpdate));
        }catch(error){
            console.log(error);
        }
    }

    getOneUser = async (dataBody:Partial<AccountDto>):Promise<AccountDto> => {
        try{
            //Estou buscando um usuário com base em seu email_
            return (await this.repository.findOne({
                where: {
                    email: dataBody.email
                }
            }));
        }catch(error){

        }
    }
}
