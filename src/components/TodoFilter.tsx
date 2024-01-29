import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

type Props = {
  todos: Todo[];
  activeFilter: string;
  onFilterChange: (filter: Status) => void;
  deleteUncompletedtodos: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  activeFilter,
  onFilterChange,
  deleteUncompletedtodos,
}) => {
  const uncompletedTodos = todos.filter(todo => !todo.completed).length;

  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <>
      <span className="todo-count" data-cy="TodosCounter">
        { uncompletedTodos === 1
          ? `${uncompletedTodos} item left`
          : `${uncompletedTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link',
            { selected: activeFilter === Status.All })}
          data-cy="FilterLinkAll"
          onClick={() => onFilterChange(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link',
            { selected: activeFilter === Status.Active })}
          data-cy="FilterLinkActive"
          onClick={() => onFilterChange(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link',
            { selected: activeFilter === Status.Completed })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterChange(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className={cn('todoapp__clear-completed', {
          'todoapp__clear-completed-hidden': completedTodos === 0
        })}
        data-cy="ClearCompletedButton"
        onClick={deleteUncompletedtodos}
      >
        Clear completed
      </button>
    </>
  );
};
