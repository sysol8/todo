import { pluralize, filterTodos } from '../src/utils';
import type { ITodoItem } from '../src/types';
import { describe, it, expect } from 'vitest';

describe("pluralize", () => {
  it("корректно склоняет глагол и существительное в зависимости от числительного", () => {
    expect(pluralize(1, ["Осталась", "Осталось"], ["задача", "задачи", "задач"])).toBe("Осталась 1 задача")

    expect(pluralize(2, ["Осталась", "Осталось"], ["задача", "задачи", "задач"]))
      .toBe("Осталось 2 задачи");

    expect(pluralize(5, ["Осталась", "Осталось"], ["задача", "задачи", "задач"]))
      .toBe("Осталось 5 задач");
  })
})

describe('filterTodos', () => {
  const todos: ITodoItem[] = [
    { id: '1', text: 'Задача 1', status: 'pending' },
    { id: '2', text: 'Задача 2', status: 'completed' },
    { id: '3', text: 'Задача 3', status: 'pending' },
  ];

  it('возвращает все задачи для фильтра all', () => {
    expect(filterTodos(todos, 'all')).toEqual(todos);
  });

  it('возвращает только незавершённые задачи для фильтра pending', () => {
    expect(filterTodos(todos, 'pending')).toEqual([
      { id: '1', text: 'Задача 1', status: 'pending' },
      { id: '3', text: 'Задача 3', status: 'pending' },
    ]);
  });

  it('возвращает только завершённые задачи для фильтра completed', () => {
    expect(filterTodos(todos, 'completed')).toEqual([
      { id: '2', text: 'Задача 2', status: 'completed' },
    ]);
  });
});