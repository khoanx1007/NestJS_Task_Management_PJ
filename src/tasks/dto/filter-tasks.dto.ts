import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class FilterTasksDTO{
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
