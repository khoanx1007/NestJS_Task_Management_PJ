import { Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateTaskDTO, FilterTasksDTO } from './task.dto';
import { Task, TaskStatus } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>){}

  async getAllTasks(filterTasksDTO?: FilterTasksDTO): Promise<Task[]> {
    return this.taskRepository.findBy(filterTasksDTO);
  }

  async getTaskById(id: number): Promise<Task>{
    const task = await this.taskRepository.findOneBy({id: id});

    if (!task){
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async createTask(createTaskDTO: CreateTaskDTO ): Promise<Task>{
    const newTask = this.taskRepository.create({...createTaskDTO, status: TaskStatus.OPEN})
    await this.taskRepository.save(newTask);
    return newTask
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task>{
    const task = await this.taskRepository.findOneBy({id: id});
    task.status = status;
    task.save();
    return task;
  }

  async deleteTaskById(id: number): Promise<void>{
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0){
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
