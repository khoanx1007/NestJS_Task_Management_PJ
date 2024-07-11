import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO, FilterTasksDTO, UpdateTaskDTO } from './task.dto';
import { Task, TaskStatus } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>){}
  async getAllTasks(filterTasksDTO?: FilterTasksDTO): Promise<Task[]> {
    return this.taskRepository.findBy(filterTasksDTO);
  }
  async getTaskById(id: number, user: User): Promise<Task>{
    const task = await this.taskRepository.findOneBy({id: id, user: user});

    if (!task){
      throw new NotFoundException('Unavailabe Task');
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

  async updateTask(id: number, updateTaskDTO: UpdateTaskDTO, user: User): Promise<Task>{
    const task = await this.getTaskById(id, user);
    const updatedTask = this.taskRepository.merge(
      task,
      updateTaskDTO,
    );
    return await this.taskRepository.save(updatedTask);
;
  }
  async deleteTaskById(id: number, user: User){
    const task = await this.getTaskById(id, user);
    this.taskRepository.remove(task);
    return "Task Deleted Successfully";
  }
}
