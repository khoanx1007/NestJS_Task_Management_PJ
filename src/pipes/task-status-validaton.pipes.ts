import { ArgumentMetadata, BadRequestException, PipeTransform, ValidationPipe } from "@nestjs/common";
import { TaskStatus } from "src/tasks/task.entity";

export class TaskStatusValidationPipe implements PipeTransform{
  readonly allowedStatuses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN
  ]
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    if(!this.isStatusValid(value)){
      throw new BadRequestException();
    }
    return value;
  }
  private isStatusValid(status: any)
  {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
