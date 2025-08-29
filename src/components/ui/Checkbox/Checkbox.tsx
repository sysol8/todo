import styles from './Checkbox.module.css';
// @ts-expect-error / подключение svg-иконки
import CheckIcon from '../../../assets/check.svg?react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

function Checkbox({ onChange, checked }: CheckboxProps) {
  return (
    <label className={styles.label}>
      <input
        className="visually-hidden"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {checked && <CheckIcon className={styles.icon} />}
    </label>
  );
}

export default Checkbox;
