import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { signUpDto } from './authDto/signUp.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }

    async signUp(signUpDto: signUpDto): Promise<void> {
        try {
            const { name, email, password } = signUpDto

            const user = await this.userService.toCheckDuplicateUser(email)
            if (user.length) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            }
            let hashedPass = await bcrypt.hash(password,10)
            let data = {
                name,
                email,
                password:hashedPass
            }
            let res = await this.userService.create(data)
        } catch (error) {
            throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR)
        }


    }

}
