import { Injectable } from '@nestjs/common';
import {Task,TaskStatus} from './task.model'
import { v4 as uuid } from 'uuid'
import { createTaskDto } from './DTO/create-task.dto';
@Injectable()
export class TaskService {
    private tasks:Task[] = []

    findAllTask():Task[]{
        return this.tasks 
    }

    createTask(taskDto:createTaskDto){
    let {title,description} = taskDto

       const task:Task = {
        id:uuid(),
        title,
        description,
        status:TaskStatus.OPEN
       } 
       this.tasks.push(task)
       return task;
    }

    getTaskByid(id:string){
    return this.tasks.find(task => task.id == id)
    }
    deleteTaskById(id:string){
        let index = this.tasks.findIndex(task => task.id == id)
        this.tasks.splice(index,1)
        return this.tasks
    }
    updateTaskById(id:string,status:TaskStatus){
       let task = this.getTaskByid(id)
       task.status = status
       return task
    }
}
