import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Todo from '../src/components/Todo/Todo.tsx';

describe('Todo App', () => {
  it('добавляет новую задачу в список через форму', () => {
    render(<Todo />);

    const input = screen.getByPlaceholderText(/введите текст/i);
    const button = screen.getByRole('button', { name: /создать задачу/i });

    fireEvent.change(input, { target: { value: 'Сделать тестовое' } });
    fireEvent.click(button);

    expect(screen.getByText('Сделать тестовое')).toBeInTheDocument();
  });

  it("меняет статус задачи при клике по чекбоксу", () => {
    render(<Todo />);

    const input = screen.getByPlaceholderText(/введите текст/i);
    const button = screen.getByRole("button", { name: /создать задачу/i });

    fireEvent.change(input, { target: { value: "Поменять статус" } });
    fireEvent.click(button);

    const todoItem = screen.getByText(/поменять статус/i).closest('div');
    const checkbox = within(todoItem!).getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("удаляет завершенные задачи по кнопке", () => {
    render(<Todo />);

    const input = screen.getByPlaceholderText(/введите текст/i);
    const button = screen.getByRole("button", { name: /создать задачу/i });

    fireEvent.change(input, { target: { value: "Очистить меня" } });
    fireEvent.click(button);

    const todoItem = screen.getByText(/очистить меня/i).closest('div');
    const checkbox = within(todoItem!).getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(screen.getByText(/удалить завершенные/i));

    expect(screen.queryByText("Очистить меня")).not.toBeInTheDocument();
  });

  it('фильтрует задачи', () => {
    render(<Todo />);

    const text = /перевернуть весь код вверх дном/i;

    const input = screen.getByPlaceholderText(/введите текст/i);
    const button = screen.getByRole('button', { name: /создать задачу/i });

    fireEvent.change(input, { target: { value: 'Перевернуть весь код вверх дном' } });
    fireEvent.click(button);

    const buttonAll = screen.getByTestId('filter-all');
    const buttonActive = screen.getByTestId('filter-pending');
    const buttonCompleted = screen.getByTestId('filter-completed');

    // т.к. элементы пересоздаются, заново ищем нужный чекбокс с этим хелпером
    const getCheckbox = () => {
      const container =
        screen.getByText(text).closest('[data-testid="todo-item"]') ??
        screen.getByText(text).closest('div'); // fallback, если тестид не проставлен
      expect(container).not.toBeNull();
      return within(container as HTMLElement).getByRole('checkbox');
    };

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(getCheckbox()).not.toBeChecked();

    fireEvent.click(buttonActive);
    expect(screen.getByText(text)).toBeInTheDocument();

    fireEvent.click(buttonCompleted);
    expect(screen.queryByText(text)).not.toBeInTheDocument();

    fireEvent.click(buttonAll);
    expect(screen.getByText(text)).toBeInTheDocument();

    fireEvent.click(getCheckbox());
    expect(getCheckbox()).toBeChecked();

    expect(screen.getByText(text)).toBeInTheDocument();

    fireEvent.click(buttonActive);
    expect(screen.queryByText(text)).not.toBeInTheDocument();

    fireEvent.click(buttonCompleted);
    expect(screen.getByText(text)).toBeInTheDocument();
  })
});