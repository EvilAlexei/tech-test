import { TodoStatus } from '@models/todo-status.enum';

export class Filters {
  todoStatus = TodoStatus.ALL;
  category = '';
}

export interface FilterEL {
  value: TodoStatus | string;
  selected: boolean;
}
