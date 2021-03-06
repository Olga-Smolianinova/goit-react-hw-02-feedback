import React from 'react';

import classNames from 'classnames'; //подключаем npm i classnames для удобства и  возможности объединения несколькиз class в одном свойстве

import './TodoList.css';

const TodoList = ({ todos, onDeleteTodo, onToggleCompleted }) => {
  return (
    <ul className="TodoList">
      {todos.map(({ id, text, completed }) => (
        <li
          key={id}
          // в className подключаем несколько class с помощью import classNames from 'classnames'
          className={classNames('TodoList__item', {
            'TodoList__item--completed': completed,
          })}
        >
          {/* вставляем checkbox */}
          <input
            type="checkbox"
            className="TodoList__checkbox"
            checked={completed}
            onChange={() => onToggleCompleted(id)}
          />

          <p className="TodoList__text">{text}</p>
          <button
            type="button"
            className="TodoList__btn"
            onClick={() => {
              onDeleteTodo(id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
export default TodoList;
