import { HttpException, HttpStatus, Injectable, Res, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { signUpDto } from './authDto/signUp.dto';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';
import { signInDto } from './authDto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './authDto/jwt.interface';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService ,
        private jwtService:JwtService
        ) { }

    async signUp(signUpDto: signUpDto): Promise<void> {
            const { name, email, password } = signUpDto
            const user = await this.userService.toCheckDuplicateUser(email)
            if (user) {
               throw new HttpException("user already exists",HttpStatus.BAD_REQUEST)
            }
            let hashedPass = await bcrypt.hash(password,10)
            let data = {
                name,
                email,
                password:hashedPass
            }
            await this.userService.create(data)
    }
    async singIn(signInDto:signInDto):Promise<{jwt:string , user}>{
        
        const {email,password} = signInDto
        let user = await this.userService.findByEmail(email)
        if(!user){
            throw new NotFoundException(`No user found`)
        }else{
            if(password){
                const isMatch = await bcrypt.compare(password,user.password)
                if(isMatch){
                    const payload:JwtPayload =  {_id:user._id}
                    const jwt = this.jwtService.sign(payload)
                    let {password ,...userWithoutPass} = user.toObject()
                    return {jwt,user:userWithoutPass}
                }else{
                    throw new UnauthorizedException('Invalid password')
                }
            }
        }
    }

}
