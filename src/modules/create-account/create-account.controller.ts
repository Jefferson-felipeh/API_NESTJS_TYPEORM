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

    @Get('query')
    async findAllQuery(@Query() data:AccountDto):Promise<AccountDto[]>{
        return (await this.service.findAllQuery(data));
    }

    @Get('list')
    async getAll():Promise<AccountDto[]>{
        return (await this.service.findAll());
    }

    @Delete('delete/:id')
    async deleteData(@Param('id') id:Partial<AccountDto>):Promise<DeleteResult>{
        return (await this.service.deleteData(id));
    }

    @Put('update/:id')
    async update(@Param('id') id:Partial<AccountDto>, @Body() bodyData:AccountDto):Promise<UpdateResult>{
        return (await this.service.update(id, bodyData));
    }
}
