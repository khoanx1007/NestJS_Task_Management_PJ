import { IsNotEmpty, MaxLength } from 'class-validator';
export class CreateTaskDTO{
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}
