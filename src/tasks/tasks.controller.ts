import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO, FilterTasksDTO, UpdateTaskDTO } from './task.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  private readonly logger = new Logger(TasksController.name)
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  getAllTasks(
    @Query(ValidationPipe) filterTasksDTO?: FilterTasksDTO,
  ): Promise<Task[]> {
    return this.tasksService.getAllTasks(filterTasksDTO);
  }

  @Get('/personal-tasks')
  getPersonalTasks(@GetUser() user: User): Promise<Task[]> {
    this.logger.verbose(`User ${user.username} get personal tasks`)
    return this.tasksService.getPersonalTasks(user);
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }
  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO, @GetUser() user: User): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO, user);
  }

  @Patch(':id')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTaskDTO: UpdateTaskDTO,
    @GetUser() user: User
  ) {
    return this.tasksService.updateTask(id, updateTaskDTO, user);
  }

  @Delete(':id')
  deleteTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User) {
    return this.tasksService.deleteTaskById(id, user);
  }
}
