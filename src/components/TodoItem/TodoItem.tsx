import styles from './TodoItem.module.css';
import Checkbox from '../ui/Checkbox/Checkbox.tsx';
import type { TodoStatus, ITodoItem } from '../../types';

interface TodoItemProps extends ITodoItem {
  onStatusChange: (id: string, status: TodoStatus) => void;
}

function TodoItem({ id, text, status, onStatusChange }: TodoItemProps) {
  const isCompleted = status === 'completed';

  const handleStatusChange = () => {
    onStatusChange(id, isCompleted ? 'pending' : 'completed');
  };

  return (
    <div className={styles.container} data-testid="todo-item">
      <Checkbox checked={isCompleted} onChange={handleStatusChange} />
      <p className={styles.text}>{text}</p>
    </div>
  );
}

export default TodoItem;
