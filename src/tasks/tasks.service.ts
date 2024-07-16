import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO, FilterTasksDTO, UpdateTaskDTO } from './task.dto';
import { Task, TaskStatus } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>) { }
  async getAllTasks(filterTasksDTO?: FilterTasksDTO): Promise<Task[]> {
    return this.taskRepository.findBy(filterTasksDTO);
  }
  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: id, user: user });
    if (!task) {
      throw new NotFoundException('Unavailabe Task');
    }
    return task;
  }
  async getPersonalTasks(user: User, filterTasksDTO?: FilterTasksDTO): Promise<Task[]> {
    const userTasks = await this.taskRepository.findBy({ user: user, ...filterTasksDTO });
    return userTasks;
  }
  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<any> {
    delete (user.password);
    const newTask = this.taskRepository.create({ ...createTaskDTO, status: TaskStatus.OPEN, user: user })
    await this.taskRepository.save(newTask);
    return {
      message: 'task created successfully',
      status: HttpStatus.CREATED,
      data: newTask,
    };
  }

  async updateTask(id: number, updateTaskDTO: UpdateTaskDTO, user: User): Promise<any> {
    const task = await this.getTaskById(id, user);
    const updatedTask = this.taskRepository.merge(
      task,
      updateTaskDTO,
    );
    await this.taskRepository.save(updatedTask)
    return {
      message: 'task update successfully',
      status: HttpStatus.OK,
      data: updatedTask,
    };
  }
  async deleteTaskById(id: number, user: User) {
    const task = await this.getTaskById(id, user);
    this.taskRepository.remove(task);
    return {
      message: 'task deleted successfully',
      status: HttpStatus.OK,
    };
  }
}
