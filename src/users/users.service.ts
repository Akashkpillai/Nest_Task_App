import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';
@Injectable()
export class UsersService {
    constructor (@InjectModel(User.name) 
    private userModel:mongoose.Model<User>){}

    async toCheckDuplicateUser(email:string){
        try {
            let user = await this.userModel.find({email:email}).exec()
            if(user.length){
                return user
            }
        } catch (error) {
           throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async create(data:Partial<User>){
         let newuser = await this.userModel.create(data)
         return newuser 
    }
}
