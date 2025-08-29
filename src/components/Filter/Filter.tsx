import styles from './Filter.module.css';
import type { FilterMode } from '../../types';
import clsx from 'clsx';

interface FilterProps {
  currentFilter: FilterMode;
  onChange: (mode: FilterMode) => void;
}

function Filter({ currentFilter, onChange }: FilterProps) {
  const modes: FilterMode[] = ['all', 'pending', 'completed'];

  const handleButtonClick = (mode: FilterMode) => {
    onChange(mode);
  };

  return (
    <div className={styles.container}>
      {modes.map((mode) => (
        <button
          key={mode}
          data-testid={`filter-${mode}`}
          className={clsx(
            styles.button,
            currentFilter === mode && styles.active,
          )}
          onClick={() => handleButtonClick(mode)}
        >
          {mode === 'all' && 'Все'}
          {mode === 'pending' && 'Активные'}
          {mode === 'completed' && 'Завершенные'}
        </button>
      ))}
    </div>
  );
}

export default Filter;
