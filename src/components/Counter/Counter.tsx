import styles from './Counter.module.css';
import { pluralize } from '../../utils';

interface CounterProps {
  count: number;
  verbForms: [string, string];
  nounForms: [string, string, string];
}

function Counter({ count, verbForms, nounForms }: CounterProps) {
  return (
    <span className={styles.text}>
      {pluralize(count, verbForms, nounForms)}
    </span>
  );
}

export default Counter;
