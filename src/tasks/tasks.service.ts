import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTasksDTO } from './dto/filter-tasks.dto';

@Injectable()
export class TasksService {
  private tasks : Task[] = [];

  getAllTasks(){
    return this.tasks
  }

  getTasksByFilter(filterTasksDTO: FilterTasksDTO){
    const {status, search} = filterTasksDTO;
    let tasks = this.getAllTasks();
    if (status){
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search){
      tasks = tasks.filter((task) => task.title.includes(search) || task.description.includes(search));
    }
    return tasks;
  }

  getTaskById(id: string): Task{
    const task = this.tasks.find((task)=> task.id === id)
    if (!task){
      throw new NotFoundException();
    }
    return task;
  }

  createTask(createTaskDTO: CreateTaskDTO ): Task{
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    }
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus){
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTaskById(id: string){
    const task = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== task.id);
    return 'task deleted';
  }
}
