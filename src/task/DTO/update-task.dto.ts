import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model";

export class updateDto {
    @IsEnum(TaskStatus)
    status:TaskStatus
}