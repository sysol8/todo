import styles from './Form.module.css';
// @ts-expect-error / иконка
import SendIcon from '../../assets/send.svg?react';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import clsx from 'clsx';

interface FormProps {
  onSubmit: (text: string) => void;
}

function Form({ onSubmit }: FormProps) {
  const [text, setText] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
    }
    setText('');
  };

  return (
    <form className={styles.form} noValidate onSubmit={handleFormSubmit}>
      <label className={styles.label}>
        <textarea
          className={clsx(styles.textarea, 'invisible-scrollbar')}
          onChange={handleInputChange}
          value={text}
          placeholder="Введите текст..."
          maxLength={150}
        ></textarea>
      </label>
      <button className={styles.button} type="submit" disabled={!text} aria-label="Создать задачу">
        <SendIcon className={styles.icon} />
      </button>
    </form>
  );
}

export default Form;
