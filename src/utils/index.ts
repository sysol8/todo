import type { ITodoItem, FilterMode } from '../types';

export function pluralize(
  count: number,
  verbForms: [string, string],
  nounForms: [string, string, string],
): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  let nounForm: string;
  if (mod10 === 1 && mod100 !== 11) {
    nounForm = nounForms[0];
  } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    nounForm = nounForms[1];
  } else {
    nounForm = nounForms[2];
  }

  const verbForm = mod10 === 1 && mod100 !== 11 ? verbForms[0] : verbForms[1];

  return `${verbForm} ${count} ${nounForm}`;
}

export function filterTodos(todos: ITodoItem[], mode: FilterMode): ITodoItem[] {
  if (mode === 'all') return todos;
  return todos.filter((todo) => todo.status === mode);
}
