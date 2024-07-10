import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
export enum TaskStatus{
  OPEN = 'OPEN',
  IN_PROGRESS = "IN_PROGRESS",
  DONE = 'DONE'
}

@Entity()
export class Task extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
