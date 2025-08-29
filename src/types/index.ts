export type TodoStatus = 'pending' | 'completed';

export interface ITodoItem {
  id: string;
  text: string;
  status: TodoStatus;
}

export type FilterMode = 'all' | TodoStatus;
