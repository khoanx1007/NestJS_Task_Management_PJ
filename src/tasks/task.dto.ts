import { IsIn, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { TaskStatus } from './task.entity';
import { PartialType } from '@nestjs/mapped-types';
export class CreateTaskDTO {
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}

export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;
}
export class FilterTasksDTO {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  title: string;
}
