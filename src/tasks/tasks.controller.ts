import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { FilterTasksDTO } from './dto/filter-tasks.dto';
import { TaskStatusValidationPipe } from 'src/pipes/task-status-validaton.pipes';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService){}

  @Get()
  getAllTasks(@Query(ValidationPipe) filterTasksDTO: FilterTasksDTO){
    if (Object.keys(filterTasksDTO).length){
      return this.tasksService.getTasksByFilter(filterTasksDTO);
    }
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task{
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body(ValidationPipe) createTaskDTO: CreateTaskDTO){
    return this.tasksService.createTask(createTaskDTO);
  }
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Task{
    return this.tasksService.updateTaskStatus(id, status);
  }
  @Delete(':id')
  deleteTaskById(@Param('id') id: string){
    return this.tasksService.deleteTaskById(id);
  }
}
