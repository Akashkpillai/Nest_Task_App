import { createTaskDto } from './DTO/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TaskService } from './task.service';
import { Body, Controller,Delete,Get, Param, Patch, Post } from '@nestjs/common';

@Controller('task')
export class TaskController {
    constructor (private taskService:TaskService){ }
        @Get()
        getAlltask():Task[]{
            return  this.taskService.findAllTask();
        }
        @Post()
        createTask(@Body() taskDto:createTaskDto):Task{
            return this.taskService.createTask(taskDto)
        }

        @Get(':id')
        getTaskById(@Param('id')id:string): Task{
            return this.taskService.getTaskByid(id)
        }

        @Delete(':id')
        deleteTaskById(@Param('id')id:string){
            return this.taskService.deleteTaskById(id)
        }

        @Patch(':id/:status')
        updateTaskById(@Param('id')id:string,@Param('status')status:TaskStatus){
            return this.taskService.updateTaskById(id,status)
        }
}
