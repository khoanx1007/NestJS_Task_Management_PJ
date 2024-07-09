import { TaskStatus } from "../tasks.model";

export class FilterTasksDTO{
  status: TaskStatus;
  search: string;
}
