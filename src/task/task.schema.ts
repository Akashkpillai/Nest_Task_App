import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/user.schema';


@Schema()
export class Task {
    @Prop({required:true})
    title:string

    @Prop({required:true})
    description:string

    @Prop()
    status:string 
}

export const TaskSchema = SchemaFactory.createForClass(Task)