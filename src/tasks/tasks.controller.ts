import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { FilterTasksDTO } from './dto/filter-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService){}

  @Get()
  getAllTasks(@Query() filterTasksDTO: FilterTasksDTO){
    if (Object.keys(filterTasksDTO).length){
      return this.tasksService.getTasksByFilter(filterTasksDTO);
    }
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string){
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO){
    return this.tasksService.createTask(createTaskDTO);
  }
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus
  ): Task{
    return this.tasksService.updateTaskStatus(id, status);
  }
  @Delete(':id')
  deleteTaskById(@Param('id') id: string){
    return this.tasksService.deleteTaskById(id);
  }
}
