
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class taskSchema{
    @Prop({required:true})
    title:string

    @Prop({required:true})
    description:string

    @Prop()
    status:string
}

export const TaskSchema = SchemaFactory.createForClass(taskSchema)