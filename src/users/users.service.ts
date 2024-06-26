import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';
import { async } from 'rxjs';
@Injectable()
export class UsersService {
    constructor (@InjectModel(User.name) 
    private userModel:mongoose.Model<User>){}

    async toCheckDuplicateUser(email:string):Promise< User|null>{
        try {
            let user = await this.userModel.findOne({email}).lean()
            return user  
        } catch (error) {
            console.error('Error in toCheckDuplicateUser:', error.message);
            throw error;
        }
     
    }

    async create(data:Partial<User>){
        try {
            let newuser = await this.userModel.create(data)
            return newuser.save() 
        } catch (error) {
            console.error('Error in toCheckDuplicateUser:', error.message);
            throw error;
        }
        
    }

    async findByEmail(email:string){
        try {
            let user = await this.userModel.findOne({email})
            return user
        } catch (error) {
            console.error('error in finding user by email', error.message);
            throw error;
        }
    }
}
