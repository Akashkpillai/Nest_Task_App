import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose'


@Module({
  imports: [
    TaskModule,
    MongooseModule.forRoot('mongodb+srv://elbowgrease001:unnimon@cluster0.nzjmbyf.mongodb.net/')
  ],
  providers: [],
})
export class AppModule {}
