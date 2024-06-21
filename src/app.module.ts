import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TaskModule,
    MongooseModule.forRoot(process.env.MONGO_URI)
  ],
  providers: [],
})
export class AppModule {}
