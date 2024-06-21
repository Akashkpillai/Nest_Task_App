import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TaskModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule
  ],
  providers: [],
})
export class AppModule {}
