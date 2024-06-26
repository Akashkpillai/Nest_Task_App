import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './authDto/signUp.dto';
import { Response } from 'express';
import { signInDto } from './authDto/signIn.dto';

@Controller('auth')
export class AuthController {
    constructor (private authService:AuthService){}
    @Post('create')
    async createUser(@Body()signUpDto:signUpDto,@Res() res:Response):Promise<void>{
        await this.authService.signUp(signUpDto)
    }

    @Post('login')
    async singIn(@Body() signInDto:signInDto):Promise<{jwt:string , user}>{
     return await this.authService.singIn(signInDto)
    }
}
