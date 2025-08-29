import styles from './Todo.module.css';
import type { ITodoItem, TodoStatus, FilterMode } from '../../types';
import { useState } from 'react';

import Form from '../Form/Form.tsx';
import List from '../List/List.tsx';
import TodoItem from '../TodoItem/TodoItem.tsx';
import Counter from '../Counter/Counter.tsx';
import { filterTodos } from '../../utils';
import Filter from '../Filter/Filter.tsx';

function Todo() {
  const [todos, setTodos] = useState<ITodoItem[]>([
    {
      id: '1',
      text: 'Сделать раз',
      status: 'pending',
    },
    {
      id: '2',
      text: 'Сделать два',
      status: 'completed',
    },
    {
      id: '3',
      text: 'И еще раз',
      status: 'pending',
    },
  ]);
  const [filter, setFilter] = useState<FilterMode>('all');

  const visibleTodos = filterTodos(todos, filter);

  const addTodo = (text: string) => {
    const newTodo: ITodoItem = {
      id: String(Date.now()),
      text,
      status: 'pending',
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const getPendingTodos = () => {
    return filterTodos(todos, 'pending');
  };

  const removeCompletedTodos = () => {
    setTodos(getPendingTodos());
  };

  const handleStatusChange = (id: string, status: TodoStatus) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, status: status } : todo)),
    );
  };

  return (
    <div className={styles.container}>
      <Filter currentFilter={filter} onChange={setFilter} />
      <Form onSubmit={addTodo}></Form>
      <List
        data={visibleTodos}
        renderItem={(item) => (
          <TodoItem
            id={item.id}
            text={item.text}
            status={item.status}
            onStatusChange={handleStatusChange}
          />
        )}
        getKey={(item) => item.id}
      />
      <div className={styles.footer}>
        <Counter
          count={getPendingTodos().length}
          verbForms={['Осталась', 'Осталось']}
          nounForms={['задача', 'задачи', 'задач']}
        />
        <button className={styles.clear} onClick={removeCompletedTodos}>
          Удалить завершенные
        </button>
      </div>
    </div>
  );
}

export default Todo;
