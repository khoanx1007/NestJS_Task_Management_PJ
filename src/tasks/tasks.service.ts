import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO, FilterTasksDTO, UpdateTaskDTO } from './task.dto';
import { Task, TaskStatus } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';
import { get } from 'http';

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
  async getPersonalTasks(user: User): Promise<Task[]>{
    const userTasks = await this.taskRepository.findBy({user: user});
    return userTasks;
  }
  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task>{
    delete(user.password);
    const newTask = this.taskRepository.create({...createTaskDTO, status: TaskStatus.OPEN, user: user})
    await this.taskRepository.save(newTask);
    return newTask
  }

  async updateTask(id: number, updateTaskDTO: UpdateTaskDTO): Promise<Task>{
    const task = this.getTaskById(id);
    this.taskRepository.update({ id }, { ...updateTaskDTO });
    return task;
  }
  async deleteTaskById(id: number): Promise<void>{
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0){
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
