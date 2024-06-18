import { createTaskDto } from './DTO/create-task.dto';
import { filterTaskDto } from './DTO/filter-task-dto';
import { updateDto } from './DTO/update-task.dto';
import { Task, TaskStatus } from './task.model';
import { TaskService } from './task.service';
import { Body, Controller,Delete,Get, Param, Patch, Post ,Query } from '@nestjs/common';

@Controller('task')
export class TaskController {
    constructor (private taskService:TaskService){ }
        @Get()
        getAlltask(@Query() filterDto:filterTaskDto):Task[]{
            if(Object.keys(filterDto).length){
            return this.taskService.getTaskByfilter(filterDto)    
            }else{
                return  this.taskService.findAllTask();
            }
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
        updateTaskById(@Param('id')id:string,@Body()updateTaskDto:updateDto){
            const {status} = updateTaskDto
            return this.taskService.updateTaskById(id,status)
        }
}
 