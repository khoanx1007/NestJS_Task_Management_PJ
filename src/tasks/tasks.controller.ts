import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO, FilterTasksDTO, UpdateTaskDTO } from './task.dto';
import { TaskStatusValidationPipe } from 'src/pipes/task-status-validaton.pipes';
import { Task, TaskStatus } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService){}

  @Get()
  getAllTasks(@Query(ValidationPipe) filterTasksDTO?: FilterTasksDTO){
    return this.tasksService.getAllTasks(filterTasksDTO);
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task>{
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body(ValidationPipe) createTaskDTO: CreateTaskDTO): Promise<Task>{
    return this.tasksService.createTask(createTaskDTO);
  }

  @Patch(':id')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe, ValidationPipe) updateTaskDTO:UpdateTaskDTO
  ): Promise<Task>{
    return this.tasksService.updateTask(id, updateTaskDTO);
  }

  @Delete(':id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number){
    return this.tasksService.deleteTaskById(id);
  }
}
