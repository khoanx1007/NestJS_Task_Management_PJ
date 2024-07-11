import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO, FilterTasksDTO, UpdateTaskDTO } from './task.dto';
import { TaskStatusValidationPipe } from 'src/pipes/task-status-validaton.pipes';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService){}

  @Get()
  getAllTasks(@Query(ValidationPipe) filterTasksDTO?: FilterTasksDTO){
    return this.tasksService.getAllTasks(filterTasksDTO);
  }

  @Get('/personal-tasks')
  getPersonalTasks(@GetUser() user: User): Promise<Task[]>{
    return this.tasksService.getPersonalTasks(user);
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task>{
    return this.tasksService.getTaskById(id);
  }
  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO, @GetUser() user: User): Promise<Task>{
    return this.tasksService.createTask(createTaskDTO, user);
  }

  @Patch(':id')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) updateTaskDTO:UpdateTaskDTO
  ): Promise<Task>{
    return this.tasksService.updateTask(id, updateTaskDTO);
  }

  @Delete(':id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number){
    return this.tasksService.deleteTaskById(id);
  }
}
