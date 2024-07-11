import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './user.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from './user.entity';
import { Task } from 'src/tasks/task.entity';
import { TasksService } from '../tasks/tasks.service';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
