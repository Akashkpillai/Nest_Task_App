import { Injectable, NotFoundException } from '@nestjs/common';
import {Task,TaskStatus} from './task.model'
import { createTaskDto } from './DTO/create-task.dto';
import { filterTaskDto } from './DTO/filter-task-dto';
import { InjectModel } from '@nestjs/mongoose';
import {Task as task} from './task.schema'
import * as mongoose from 'mongoose';
@Injectable()
export class TaskService {
    constructor(@InjectModel(task.name)
    private taskModel:mongoose.Model<task>){}

   async findAllTask(): Promise<Task[]>{
        return this.taskModel.find()
    }

   async createTask(taskDto:createTaskDto){
    let {title,description} = taskDto

       const task:Task = {
        title,
        description,
        status:TaskStatus.OPEN
       } 
        const res = await this.taskModel.create(task)
        return res
    }

        async getTaskByid(id: string):Promise<task> {
        const found = await this.taskModel.findById(id)
        if (!found) {
            throw new NotFoundException(`Task with id:${id} is not found`);
        }
        return found
    }
    async deleteTaskById(id:string): Promise <boolean>{
        let data = await this.taskModel.findByIdAndDelete(id) 
        if(data){
            return true
        }else{
            return false
        }
    }
    async updateTaskById(id:string,status:TaskStatus){
       let task = this.getTaskByid(id)
      if(task){
       let found = await this.taskModel.updateOne({_id:id},{$set:{status:status}});
       return true
      }else{
        throw new NotFoundException(`No task found to update`)
      }
    }
   async getTaskByfilter(filterDto:filterTaskDto):Promise<task[]>{
        let tasks = await this.findAllTask()
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
