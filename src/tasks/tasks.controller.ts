import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO, FilterTasksDTO, UpdateTaskDTO } from './task.dto';
import { Task } from './task.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { SkipAuth } from 'src/guard/skip-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  private readonly logger = new Logger(TasksController.name)
  constructor(private readonly tasksService: TasksService) { }

  @SkipAuth()
  @Get()
  getAllTasks(
    @Query(ValidationPipe) filterTasksDTO?: FilterTasksDTO,
  ): Promise<Task[]> {
    return this.tasksService.getAllTasks(filterTasksDTO);
  }

  @Get('/personal')
  getPersonalTasks(@GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getPersonalTasks(user);
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }
  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO, @GetUser() user: User): Promise<any> {
    return this.tasksService.createTask(createTaskDTO, user);
  }

  @Patch(':id')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTaskDTO: UpdateTaskDTO,
    @GetUser() user: User
  ): Promise<any> {
    return this.tasksService.updateTask(id, updateTaskDTO, user);
  }

  @Delete(':id')
  deleteTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User) {
    return this.tasksService.deleteTaskById(id, user);
  }
}
