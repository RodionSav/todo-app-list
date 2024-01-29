import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import './../styles/todo.scss'
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  deleteTodo: (todo: number) => void,
  onTodoEdit: (todoId: number, newTitle: string) => void,
  todoCompleteUpdate: (todoId: number, newCompleted: boolean) => void,
  isLoading: boolean,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  todoCompleteUpdate,
  onTodoEdit,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleNewTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value.trim());
  };

  const handleEditStart = (newTodo: Todo) => {
    setIsEditing(true);

    if (newTodo) {
      setEditedTitle(newTodo.title);
      setSelectedTodoId(newTodo.id);
      // console.log(selectedTodoId)
    }

  };

  useEffect(() => {
    console.log(selectedTodoId);
  }, [selectedTodoId])

  const handleEditEnd = () => {
    setIsEditing(false);

    if (editedTitle.trim() && selectedTodoId) {
      onTodoEdit(selectedTodoId, editedTitle)
    } else {
      deleteTodo(todo.id)
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

    if (event.key === 'Enter') {
      if (editedTitle.trim()) {
        event.preventDefault();
        handleEditEnd();
      } else {
        deleteTodo(todo.id);
        setIsEditing(false);
      }
    }

    if (event.key === 'Escape') {
      setEditedTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo', { completed: todo.completed })}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => todoCompleteUpdate(todo.id, !todo.completed)}
        />

      </label>
      {isEditing ? (
        <form>
          <input
            ref={inputRef}
            type="text"
            className="todo__title-field"
            value={editedTitle}
            onChange={handleNewTodoTitle}
            onBlur={handleEditEnd}
            onKeyDown={handleKeyDown}
          />
        </form>
      ) : (
        <>
          <span
            onDoubleClick={() => handleEditStart(todo)}
            data-cy="TodoTitle"
            className="todo__title"
          >
            {isLoading && todo.id === selectedTodoId
            ? <div className="loader" /> : todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
}
