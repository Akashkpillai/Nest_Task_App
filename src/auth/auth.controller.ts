import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './authDto/signUp.dto';

@Controller('auth')
export class AuthController {
    constructor (private authService:AuthService){}
    @Post('create')
    async createUser(@Body()signUpDto:signUpDto):Promise<void>{
        await this.authService.signUp(signUpDto)
    }
}
