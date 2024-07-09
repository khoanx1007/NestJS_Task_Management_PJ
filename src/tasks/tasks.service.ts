import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks : Task[] = [];

  getAllTasks(){
    return this.tasks
  }

  getTaskById(id: string){
    return this.tasks.find((task)=> task.id === id)
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
    const task = this.tasks.find((task)=> task.id === id);
    task.status = status;
    return task;
  }

  deleteTaskById(id: string){
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return 'task deleted';
  }
}
