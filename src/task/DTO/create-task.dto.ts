import { IsNotEmpty } from "class-validator";
export class createTaskDto {
    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    user:string
}