import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TaskModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UsersModule
   ],
  providers: [],
})
export class AppModule {}
