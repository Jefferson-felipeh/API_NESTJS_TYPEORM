import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class AccountDto{

    @IsString()
    id:string

    @IsString({message: ''})
    @IsNotEmpty()
    @Length(10,50)
    name: string

    @IsEmail()
    email:string

    @IsNumber()
    age:string

    @IsString()
    @IsNotEmpty()
    @Length(5,12)
    password:string

    @IsDateString()
    createdOn:Date

    @IsDateString()
    updatedOn:Date
}