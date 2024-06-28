import { createTaskDto } from './DTO/create-task.dto';
import { filterTaskDto } from './DTO/filter-task-dto';
import { updateDto } from './DTO/update-task.dto';
import { Task, TaskStatus } from './task.model';
import { TaskService } from './task.service';
import { Body, Controller,Delete,Get, Param, Patch, Post ,Query, UseGuards } from '@nestjs/common';
import {Task as task} from './task.schema'
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
    constructor (private taskService:TaskService){ }
        @Get()
        getAlltask(@Query() filterDto:filterTaskDto):Promise<task[]>{
            if(Object.keys(filterDto).length){
            return this.taskService.getTaskByfilter(filterDto)    
            }else{
                return  this.taskService.findAllTask();
            }
        }
        @Post()
        async createTask(@Body() taskDto:createTaskDto): Promise<task>{
         return await this.taskService.createTask(taskDto)
        }

        @Get(':id')
        async getTaskById(@Param('id')id:string):Promise<task>{
            return await this.taskService.getTaskByid(id)
        }

        @Delete(':id')
        async deleteTaskById(@Param('id')id:string):Promise<boolean>{
            return await this.taskService.deleteTaskById(id)
        }

        @Patch(':id/:status')
        async updateTaskById(@Param('id')id:string,@Body()updateTaskDto:updateDto){
            const {status} = updateTaskDto
            return await this.taskService.updateTaskById(id,status)
        }
}
 