import styles from './List.module.css';
import { type ReactNode } from 'react';
import clsx from 'clsx';

interface ListProps<T> {
  data: T[];
  renderItem: (item: T) => ReactNode;
  getKey: (item: T) => string | number;
}

function List<T>({ data, renderItem, getKey }: ListProps<T>) {
  if (data.length === 0) {
    return <p className={styles.text}>Список пуст</p>;
  }

  return (
    <ul className={clsx(styles.list, 'custom-scrollbar')}>
      {data.map((item) => (
        <li key={getKey(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

export default List;
