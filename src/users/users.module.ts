import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './user.schema';

@Module({
  providers: [UsersService],
  exports:[UsersService],
  imports:[
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ]
})
export class UsersModule {}
