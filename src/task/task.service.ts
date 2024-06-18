import { Injectable, NotFoundException } from '@nestjs/common';
import {Task,TaskStatus} from './task.model'
import { v4 as uuid } from 'uuid'
import { createTaskDto } from './DTO/create-task.dto';
import { filterTaskDto } from './DTO/filter-task-dto';
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

    getTaskByid(id: string) {
        const found = this.tasks.find(task => task.id == id)
        if (!found) {
            throw new NotFoundException(`Task with id:${id} is not found`);
        }
        return found
    }
    deleteTaskById(id:string){
        let index = this.tasks.findIndex(task => task.id == id)
        if(index < 0){
            throw new NotFoundException(`Task with id:${id} is not found`)
        }else{
            this.tasks.splice(index,1)
            return this.tasks
        }
    }
    updateTaskById(id:string,status:TaskStatus){
       let task = this.getTaskByid(id)
       task.status = status
       return task
    }
    getTaskByfilter(filterDto:filterTaskDto){
        let tasks = this.findAllTask()
        const {status,search} = filterDto;
        if(status){
          tasks = tasks.filter(task => task.status === status)
        }
        if(search){
            tasks = tasks.filter(task => {
                if(task.title.includes(search) || task.description.includes(search)){
                    return true
                }else{
                    return false
                }
            })
        }
        return tasks;
    }
}
