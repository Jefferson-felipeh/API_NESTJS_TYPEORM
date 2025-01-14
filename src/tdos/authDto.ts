export class AuthDto{
    token: string
    expiresIn:number
}

export class BodyAuthLogin{
    email:string
    password: string
}