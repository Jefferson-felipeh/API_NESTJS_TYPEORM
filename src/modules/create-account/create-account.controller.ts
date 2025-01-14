import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AccountDto } from 'src/tdos/CreateAccountDto';
import { CreateAccountService } from './create-account.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('account')
export class CreateAccountController {
    constructor(private readonly service:CreateAccountService){}

    //Rota responsável pela criação de uma nova conta_
    @Post('create')
    async create(@Body() dataBody:AccountDto):Promise<AccountDto>{
        const dataService = await this.service.create(dataBody);
        return dataService;
    }

    //Rota responsável por listar dados de acordo com valores de consultas passadas no EndPoint_
    @Get('query')
    async findAllQuery(@Query() data:AccountDto):Promise<AccountDto[]>{
        return (await this.service.findAllQuery(data));
    }

    //Rota responsável por listar todos os dados do banco de dados_
    @Get('list')
    async getAll():Promise<AccountDto[]>{
        return (await this.service.findAll());
    }

    //Rota responsável por deletar um dado de acordo com o seu id especificado_
    @Delete('delete/:id')
    async deleteData(@Param('id') id:Partial<AccountDto>):Promise<DeleteResult>{
        return (await this.service.deleteData(id));
    }

    //Atualizando os dados do banco de acordo com um id específico_
    @Put('update/:id')
    async update(@Param('id') id:Partial<AccountDto>, @Body() bodyData:AccountDto):Promise<UpdateResult>{
        return (await this.service.update(id, bodyData));
    }
}
